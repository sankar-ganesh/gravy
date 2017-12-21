var preload = {
  name: 'preload_sw.js',

  register: function() {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.register(preload.name).then(() => {
        console.log('Registered');
      }, () => {
        console.log('Not Registered');
      });
    } else {
      console.log('Not Registered');
    }
  },

  deregister: function() {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (let registration of registrations) {
        let scriptURL = registration && registration.active && registration.active.scriptURL;
        if (scriptURL === (registration.scope + preload.name)) {
          registration.unregister().then(() => {
            console.log('Unregistered Successfully');
          });
        }
      }
    });
  }
};

window.addEventListener('load', preload.register);
window.addEventListener('unload', preload.deregister);
