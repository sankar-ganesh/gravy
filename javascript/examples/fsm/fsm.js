/*
 *  FSM Class
 *
 *	Properties
 *	name => name of the transition
 *
 *	Methods
 *	getName => returns the transition name
 *
 *  Life Cycle Events
 *	onBeforeTransition => before transition begins
 *	onTransition => when the transition is in progress
 *	onAfterTransition => after the transition completes
 *	didTransition => on every transition
 *
 */

var StateMachine = (function() {
	var attachStates = function() {
				let methods = this.lifeCycle.methods();

				this.lifeCycle.states().forEach(state => {
					let name = state.name;

					// Add Transition Observers
					if (methods.hasOwnProperty(`on${name}`)) {

						state[`onEnter${name}`] = methods[`onEnter${name}`];
						state[`onLeave${name}`] = methods[`onLeave${name}`];
						state[`on${name}`] = methods[`on${name}`];
					}
				});
			},
			attachTransitions = function() {
				let methods = this.lifeCycle.methods();

				this.lifeCycle.transitions().forEach(transition => {
					let name = transition && transition.name;

					// Add Transition Methods
					this.lifeCycle.spin(transition);
					if (!this[name] || !this.hasOwnProperty(name)) {
						this[name] = (payload) => this.lifeCycle.run(name, payload);
					}

					// Add Transition Observers
					if (methods.hasOwnProperty(`on${name}`)) {

						transition[`onBefore${name}`] = methods[`onBefore${name}`];
						transition[`onAfter${name}`] = methods[`onAfter${name}`];
						transition[`on${name}`] = methods[`on${name}`];
					}
				});
			},
			initialize = function(fsmObject) {
				this.lifeCycle = new LifeCycleClass({
					states: fsmObject.states,
					transitions: fsmObject.transitions,
					methods: fsmObject.methods,
					state: fsmObject.state,
					from: void 0,
					to: fsmObject.state.name
				});
				
				if (this.lifeCycle.state()) {
					if (!this.lifeCycle.states().filter(state => state.name === this.lifeCycle.state.name)) {
						this.lifeCycle.setState(void 0);
						this.lifeCycle.setTo(void 0);
					}

					// Initialize States
					attachStates.call(this);

					// Initialize Transitions
					attachTransitions.call(this);
				}
			};

	function FSM(fsmObject) {
		initialize.call(this, fsmObject);
		return this;
	}

	FSM.prototype.is = function(state) {
		return state.name === this.lifeCycle.state().name;
	};

	FSM.prototype.can = function(transition) {
		let can = false;
		this.lifeCycle.transitions().forEach(t => {
			if (transition.name === t.name) {
				if (t.from.includes(this.lifeCycle.state().name)) {
					can = true;
				}
			}
		});
		return can;
	};

	FSM.prototype.cannot = function(transition) {
		let cannot = true;
		this.lifeCycle.transitions().forEach(t => {
			if (transition.name === t.name) {
				if (t.from.includes(this.lifeCycle.state().name)) {
					cannot = false;
				}
			}
		});
		return cannot;
	};

	FSM.prototype.transitions = function() {
		return this.lifeCycle.transitions().filter(transition => transition.from.includes(this.lifeCycle.state().name));
	};

	FSM.prototype.allTransitions = function() {
		return this.lifeCycle.transitions();
	};

	return FSM;
})();