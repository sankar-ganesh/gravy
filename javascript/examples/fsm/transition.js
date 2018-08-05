/*
 *  Transition Class
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

var TransitionClass = (function() {
	var listen = function(prepose) {
				let cb = this[`${prepose}${this.name}`];
				if (cb && typeof cb === "function") {
					cb();
				}
			};

	function Transition(fsmTransition) {
		this.name = fsmTransition.name;
		this.from = fsmTransition.from;
		this.to = fsmTransition.to;
	}

	Transition.prototype.onBeforeTransition = function() {
		if (this.name) {
			console.log(`Before Transition ${this.name} begins`);
			listen.call(this, "onBefore");
		}
	};

	Transition.prototype.onAfterTransition = function() {
		if (this.name) {
			console.log(`Transition ${this.name} completes`);
			listen.call(this, "onAfter");
			listen.call(this, "on");
		}
	};

	Transition.prototype.onTransition = function() {
		if (this.name) {
			console.log(`Transition ${this.name} begins`);
		}
	};

	return Transition;
})();