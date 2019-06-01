import esp from "espruino";

esp.init(() => {});

Espruino.Config.BAUD_RATE = 115200;

esp.sendFile("COM5", "src/index.js", () => {});
