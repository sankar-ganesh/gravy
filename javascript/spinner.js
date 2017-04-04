/*
 *  spinner - Class returns a singleton object
 *
 *  spin - Runs `await` in a loop, spans multiple thread
 *  exec - Returns promise for every thread
 *  run  - Executes the thread
 */

 var spinner = (function() {
   var instance;

   function Spinner() {
   };

   Spinner.prototype.exec = function() {
     return new Promise(function(resolve, reject) {
       setTimeout(function() {
         resolve();
       }, 1000);
     });
   };

   Spinner.prototype.spin = function() {
     var that = this;
     [1, 2, 3, 4, 5].forEach((val) => {
       that.run(val);
       console.log(`Calling Thread ${val}`);
     });
   };

   Spinner.prototype.run = async function(val) {
     await this.exec();
     console.log(`Executing Thread ${val}`);
   };

   return {
     getInstance: function() {
       if (!instance) {
         instance = new Spinner();
         instance.constructor = null;
       }
       return instance;
     }
   }
 })();

 var spinnerObj = spinner.getInstance();
 spinnerObj.spin();
