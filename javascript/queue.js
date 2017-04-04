/*
 *  Queue is a singleton object which allows you to undergo two basic operations - enque & deque
 *
 *  enque - {key, listener} adds the listener to the queue
 *  deque - {key} runs all listeners and leave the queue
 */

var queue = (function() {
  var queue = {};

  return {
    enque: function(key, listener) {
      if (typeof queue[key] === 'undefined') {
        queue[key] = [];
      }

      queue[key].push(listener);
    },

    deque: function(key) {
      let q = queue[key];

      if (typeof q === 'undefined') {
        return;
      }

      while (q.length) {
        let listener = q.shift();

        if (typeof listener === 'function') {
          listener();
        }
      }
    }
  }
})();
