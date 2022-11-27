const W3CWebSocket = require("websocket").w3cwebsocket;
const redPack = require("./botbikunMerah.json");
const bluePack = require("./botBikunBiru.json");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clientRunner(client, route, ms, name) {
  client.onopen = async function () {
    console.log("WebSocket Client Connected");

    await sleep(ms);

    console.log(`client ${name} starting`);

    while (true) {
      for (let x = 0; x < route.length; x++) {
        const data = route[x];
        const payload = {
          long: data.long,
          lat: data.lat,
          speed: data.speed,
          heading: data.heading,
        };
        client.send(JSON.stringify(payload));
        await sleep(3000);
      }
    }
  };

  client.onmessage = function (e) {
    if (typeof e.data === "string") {
      console.log("Received: '" + e.data + "'");
    }
  };
}

async function main() {
  var client = new W3CWebSocket(
    "wss://api.bikunku.com/bus/stream?type=driver&experimental=true&experimentalId=1"
  );

  var client2 = new W3CWebSocket(
    "wss://api.bikunku.com/bus/stream?type=driver&experimental=true&experimentalId=2"
  );

  clientRunner(client, redPack, 0, "1");

  clientRunner(client2, bluePack, 5000, "2");
}

main();
