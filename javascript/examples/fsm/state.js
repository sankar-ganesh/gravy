/*
 *  State Class
 *
 *	Properties
 *	name => name of the state
 *
 *	Methods
 *	getName => returns the state name
 *
 *  Life Cycle Events
 *	onLeave => while leaving the state
 *	onEnter => while entering the state
 *	didLeave => after the state is left
 *	didEnter => after the state is entered
 *
 */

var StateClass = (function() {
	var listen = function(prepose, event) {
				let cb = event? this[`${prepose}${this.name}`] : this[`${prepose}${event}${this.name}`];
				if (cb && typeof cb === "function") {
					cb();
				}
			};

	function State(fsmState) {
		this.name = fsmState;
	}

	State.prototype.onLeave = function() {
		if (this.name) {
			console.log(`Leaving...${this.name}`);
			listen.call(this, "on", "Leave");
		}
	};

	State.prototype.didLeave = function() {
		if (this.name) {
			console.log(`Left...${this.name}`);
			listen.call(this, "did", "Leave");
		}
	};

	State.prototype.onEnter = function(state) {
		if (this.name) {
			console.log(`Entering...${this.name}`);
			state.didLeave();
			listen.call(this, "on", "Enter");
			this.didEnter();
			listen.call(this, "on");
		}
	};

	State.prototype.didEnter = function() {
		if (this.name) {
			console.log(`Entered...${this.name}`);
			listen.call(this, "did", "Enter");
		}
	};

	return State;
})();