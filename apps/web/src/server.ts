import { createServer } from "node:http";

export interface AppConfig {
  appName: string;
  host: string;
  port: number;
}

export function buildStatus(config: AppConfig) {
  return {
    appName: config.appName,
    status: "ok",
    url: `http://${config.host}:${config.port}`
  };
}

export function createApp(config: AppConfig) {
  return createServer((_request, response) => {
    response.writeHead(200, {
      "content-type": "application/json; charset=utf-8"
    });
    response.end(JSON.stringify(buildStatus(config)));
  });
}
