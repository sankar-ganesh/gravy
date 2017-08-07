/*
 *  NDJSON (Newline Delimiter JSON) Parser
 *
 *  For non-browser applications, this helps to overcome the complexity of using WebSockets
 *
 */


var createReadStream = function (response) {
    var reader_handle,
        cancelled = false,
        start = (controller) => {
          var handle = response.getReader(),
              decoder = new TextDecoder(),
              data_stream = '';

          reader_handle = handle;
          const streamNDJSON = (async () => {
            do {
              result = await handle.read();
              if (result.done) {
                break;
              }

              let data = decoder.decode(result.value, { stream: true });
              data_stream += data;

              let data_array = data_stream.split('\n');
              while (data_array.length) {
                let data = data_array.shift();
                data = data.trim();
                if (data) { // Data Stream
                  try {
                    controller.enqueue(JSON.parse(data));
                  } catch (e) {
                    controller.error(e);
                    cancelled = true;
                    handle.cancel();
                    return;
                  }
                }
              }
            } while(true);

            if (cancelled) {
              return;
            }
            controller.close();
            return;
          })();
        },
        cancel = (why) => {
          console.log(`Cancelled for ${why}`);
          cancelled = true;
          reader_handle.cancel();
        };

    return new ReadableStream({
      start: start,
      cancel: cancel
    });
};

const fetchNDJSON = (async () => {
  var response = await fetch("/api"),
      body = response && response.body;

  if (body) {
    let reader = createReadStream(body).getReader(),
        result, interval = 1000;

    do {
      result = await reader.read();
      let data_out = result.value;
      if (data_out) {
        setTimeout(() => {
          let div = document.createElement('div');
          div.innerHTML = data_out.item;
          document.body.appendChild(div);
        }, interval);
        interval += 1000;
      }
    } while(!result.done);
  }
})();
