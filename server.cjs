"use strict";
const http = require("http");
const fs   = require("fs");
const path = require("path");
const root = path.join(__dirname, "dist");
const port = 5173;

const types = {
  ".html":"text/html; charset=utf-8",
  ".js":"application/javascript; charset=utf-8",
  ".css":"text/css; charset=utf-8",
  ".json":"application/json; charset=utf-8",
  ".png":"image/png", ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".svg":"image/svg+xml", ".ico":"image/x-icon",
  ".map":"application/json"
};

const send = (res, code, body, type="text/plain; charset=utf-8")=>{
  res.writeHead(code, { "content-type": type });
  res.end(body);
};

const serve = (req, res)=>{
  try{
    let url = req.url.split("?")[0];
    if (url === "/") url = "/index.html";
    const filePath = path.join(root, url);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()){
      const ext = path.extname(filePath).toLowerCase();
      const buf = fs.readFileSync(filePath);
      return send(res, 200, buf, types[ext] || "application/octet-stream");
    }
    // SPA fallback
    const html = fs.readFileSync(path.join(root,"index.html"));
    return send(res, 200, html, "text/html; charset=utf-8");
  }catch(e){
    return send(res, 500, String(e));
  }
};

http.createServer(serve).listen(port, ()=> {
  console.log("Static server ready on http://127.0.0.1:"+port);
});