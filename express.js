const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get(
  "/example",
  (req, res, next) => {
    res.set("Set-Cookie", "dsdg");
    console.log(req.params);
    next();
  },
  (req, res, next) => {
    return res.send({ greeting: "hello world" });
  }
);

app.post("/example", (req, res, next) => {
  console.log(req.body);

  res.send(req.body);
});

app.listen(3000, () => {
  console.log("Started listening on port", 3000);
});
