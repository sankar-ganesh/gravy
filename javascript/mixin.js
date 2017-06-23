
/*
 *  Javascript Mixin
 *
 *  Mixin is a composable function which mix new properties and behaviors
 *  Simply pass an object to the mixin and get it extended. No base factor or constructor required
 *
 */

 const stackMixin = s => {
   let next = 0;

   return Object.assign({}, s, {
     empty() {
       return next === 0;
     },

     push() {
       next += 1;
       console.log(`Pushed ${next}`);
       return this;
     },

     pop() {
       if (this.empty()) {
         console.log('Stack Empty');
       } else {
         console.log(`Poped ${next}`);
         next -= 1;
         return this;
       }
     }
   });
 }

 var stack = stackMixin({});
 console.log(stack.empty());
 stack.push();
 console.log(stack.empty());
 stack.pop();
 console.log(stack.empty());
 stack.pop();
