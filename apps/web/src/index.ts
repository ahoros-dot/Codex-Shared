import { createApp } from "./server.js";

function resolvePort(value: string | undefined) {
  if (!value) {
    return 3000;
  }

  const parsed = Number(value);
  if (Number.isInteger(parsed) && parsed > 0) {
    return parsed;
  }

  return 3000;
}

const config = {
  appName: process.env.APP_NAME ?? "codex-shared",
  host: process.env.APP_HOST ?? "127.0.0.1",
  port: resolvePort(process.env.APP_PORT)
};

const server = createApp(config);

server.listen(config.port, config.host, () => {
  console.log(`${config.appName} listening on http://${config.host}:${config.port}`);
});
