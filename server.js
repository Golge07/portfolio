const http = require("http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT) || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
    .prepare()
    .then(() => {
        const server = http.createServer((req, res) => handle(req, res));

        server.listen(port, hostname, () => {
            // eslint-disable-next-line no-console
            console.log(`HTTP server hazır: http://${hostname}:${port} (dev=${dev})`);
        });
    })
    .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("Server başlatılamadı:", error);
        process.exit(1);
    });
