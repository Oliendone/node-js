const http = require("http");

const server = http.createServer((req, res) => {
  console.log("request received");

  const method = req.method;
  const pathRequest = req.url;
  const headers = req.headers;
  let body = "";

  req.on("data", (bodyChunk) => {
    console.log("bodyChunk: ", bodyChunk);

    body += bodyChunk.toString();
  });

  req.on("end", () => {
    console.log(method);
    console.log(pathRequest);
    console.log(headers);

    res.writeHead(201, {
      "Content-type": "text/plain",
    });
    res.end(body);
  });
});

server.listen(80, () => {
  console.log("started listening on port 3000");
});
