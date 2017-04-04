/*
 *  SpinnerClass - Class
 *
 *  getInstance - returns the singleton Object
 *  spin - Runs `await` in a loop, spans multiple thread
 *  exec - Returns promise for every thread
 *  run  - Executes the thread
 */

 var SpinnerClass = (function() {
   var instance;

   function Spinner() {
     if (instance) {
       return instance;
     }
     instance = this;
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

   Spinner.prototype.getInstance = function() {
     return instance || new Spinner();
   }

   return Spinner;
 })();

 var spinner = new SpinnerClass();
 spinner.spin();
