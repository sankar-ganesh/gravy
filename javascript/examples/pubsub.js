/*
 *  PubSubClass - Class
 *
 *  getInstance - returns the singleton Object
 *  subscribe - Attach the callback for the event
 *  publish - Broadcast the data for the subscribed event
 *  
 */

var PubSubClass = (function() {
	var instance, events = {};

	function PubSub() {
		if (instance) {
			return instance;
		}
		instance = this;
	}

	PubSub.prototype.subscribe = function(event, callback) {
		// Setup Event
		if (!events.hasOwnProperty(event)) {
			events[event] = [];
		}

		// Attach Event Callback
		events[event].push(callback);
	};

	PubSub.prototype.publish = function(event, data) {
		// Broadcast Event Data
		if (events.hasOwnProperty(event)) {
			events[event].map(callback => callback(data));
		}
	};

	PubSub.prototype.getInstance = function() {
		return instance || new PubSub();
	};

	return PubSub;
})();