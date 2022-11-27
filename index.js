const WebSocket = require("ws");
const redPack = require("./data/red.json");
const bluePack = require("./data/blue.json");

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
          long: data.lng,
          lat: data.lat,
          speed: 1.0,
          heading: 1.0,
        };
        client.send(JSON.stringify(payload));
        await sleep(1000);
      }
    }
  });
}

async function main() {
  for (let index = 0; index < 5; index++) {
    const url = `wss://api.bikunku.com/bus/stream?type=driver&experimental=true&experimentalId=${
      index + 1
    }`;
    const client = new WebSocket(url);
    clientRunner(
      client,
      index % 2 == 0 ? redPack : bluePack,
      index * 30000,
      `${index}`
    );
  }
}

main();
