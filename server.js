const http = require("http");
const next = require("next");
const dotenv = require("dotenv");

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT) || 80;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = http.createServer((req, res) => handle(req, res));

    server.listen(port, hostname, () => {
        console.log(`HTTP server hazır: http://${hostname}:${port} (dev=${dev})`);
    });
}).catch((error) => {
    console.error("Server başlatılamadı:", error);
    process.exit(1);
});
