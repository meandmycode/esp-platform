const wifi = require("Wifi");
const http = require("http");
const ws = require("ws");
const pca = require("PCA9685");

const pcai2c = new I2C();
pcai2c.setup({ sda: D4, scl: D5 });

const server = ws.createServer(() => {});
  
wifi.connect("WIFI_NAME", { password: "WIFI_PASSWORD" }, err => {
 
  console.log(wifi.getIP());
  
  server.listen(80);
  server.on("websocket", function(ws) {
    ws.send("Hello!");
  });
  
});

var pwm = pca.connect(pcai2c, { callback: function() {
  
  server.on("websocket", function(ws) {
    ws.on('message',function(msg) {
      const data = JSON.parse(msg);
      const raw = 100 + ((data.degree / 180) * 500);
      
      pwm.setRAW(data.index, 0, Math.round(raw));
    });
  });
  
}});
