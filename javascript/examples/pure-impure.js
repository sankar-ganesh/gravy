/*
 *  Pure & Impure
 */

 (function impure() {
   var x, z;

   function calc(a) {
     return a + x + z;
   }

   x=10, z=20;
   console.log(calc(50));  // returns 80
   console.log("x =" +x+" z ="+z);
   x=20, z=40;
   console.log(calc(50));  // returns 110
   console.log("x =" +x+" z ="+z);
 })();

 (function pure1() {
   var x, z;
   function calc(a) {
     var [origX, origZ] = [x, z];
     x = 10;
     z = 20;
     var y = fn();
     [x, z] = [origX, origZ];
     return y;

     function fn() {
       return a + x + z;
     }
   }

   x=10, z=20;
   console.log(calc(50));  // returns 80 always
   console.log("x =" +x+" z ="+z);
   x=20, z=40;
   console.log(calc(50));  // returns 80 always
   console.log("x =" +x+" z ="+z);
 })();

 (function pure2() {
   var x, z;

   function calc(a) {
     var x = 10, z = 20;
     return fn();

     function fn() {
       return a + x + z;
     }
   }

   x=10, z=20;
   console.log(calc(50));  // returns 80 always
   console.log("x =" +x+" z ="+z);
   x=20, z=40;
   console.log(calc(50));  // returns 80 always
   console.log("x =" +x+" z ="+z);
 })();
