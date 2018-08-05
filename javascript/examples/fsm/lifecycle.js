/*
 *  Life Cycle Class
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

var LifeCycleClass = (function() {
	function LifeCycle(fsmObject) {
		this._states = fsmObject.states || [];
		this._transitions = fsmObject.transitions || [];
		this._methods = fsmObject.methods || {};
		this._state = fsmObject.state;
		this._from = fsmObject.from;
		this._to = fsmObject.to;
		return this;
	}

	LifeCycle.prototype.states = function() {
		return this._states;
	};

	LifeCycle.prototype.setStates = function(fsmStates) {
		this._states = fsmStates;
	};

	LifeCycle.prototype.transitions = function() {
		return this._transitions;
	};

	LifeCycle.prototype.setTransitions = function(fsmTransitions) {
		this._transitions = fsmTransitions;
	};

	LifeCycle.prototype.methods = function() {
		return this._methods;
	};

	LifeCycle.prototype.setMethods = function(fsmMethods) {
		this._methods = fsmMethods;
	};

	LifeCycle.prototype.state = function() {
		return this._state;
	};

	LifeCycle.prototype.setState = function(fsmState) {
		this._state = fsmState;
	};

	LifeCycle.prototype.setFrom = function(fsmFrom) {
		this._from = fsmFrom;
	};

	LifeCycle.prototype.setTo = function(fsmTo) {
		this._to = fsmTo;
	};

	LifeCycle.prototype.spin = function(transition) {
		let name = transition && transition.name;
		if (!this[name] || !this.hasOwnProperty(name)) {
			this[name] = [];
		}
		this[name].push(transition);
	};

	LifeCycle.prototype.run = function(nameOfTransition, payload) {
		this[nameOfTransition].forEach(transition => {
			if (transition.from.includes(this._state.name)) {
				setTimeout(() => {
					transition.onBeforeTransition();
					this._state.onLeave();
					transition.onTransition();

					let fromState = this._state,
							toState = this._states.find(st => st.name === transition.to);

					if (fromState.name && toState.name) {
						this._from = fromState.name;
						this._to = toState.name;
						this._state = toState;
					}

					this._state.onEnter(fromState);
					transition.onAfterTransition();
				}, 0);
			}
		});
	};

	return LifeCycle;
})();