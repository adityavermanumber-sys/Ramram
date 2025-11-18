const http = require("http");

let keyStore = {};

http.createServer((req, res) => {
  let url = new URL(req.url, `http://${req.headers.host}`);
  let key = url.searchParams.get("key");
  let uid = url.searchParams.get("uid");

  if (!key || !uid) {
    res.end("error");
    return;
  }

  if (!keyStore[uid]) {
    res.end("invalid");
    return;
  }

  let data = keyStore[uid];

  if (Date.now() > data.expires) {
    res.end("expired");
    return;
  }

  res.end(data.code);

}).listen(8080);
