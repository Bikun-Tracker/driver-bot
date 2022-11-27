const WebSocket = require("ws");
const redPack = require("./data/botbikunMerah.json");
const bluePack = require("./data/botBikunBiru.json");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clientRunner(client, route, ms, name) {
  client.on("open", async function () {
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
  });
}

async function main() {
  var client = new WebSocket(
    "wss://api.bikunku.com/bus/stream?type=driver&experimental=true&experimentalId=1"
  );

  var client2 = new WebSocket(
    "wss://api.bikunku.com/bus/stream?type=driver&experimental=true&experimentalId=2"
  );

  clientRunner(client, redPack, 0, "1");

  clientRunner(client2, bluePack, 5000, "2");
}

main();
