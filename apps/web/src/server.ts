import { createServer } from "node:http";

export interface AppConfig {
  appName: string;
  host: string;
  port: number;
}

interface AppResponse {
  body: string;
  headers: Record<string, string>;
  statusCode: number;
}

export function buildStatus(config: AppConfig) {
  return {
    appName: config.appName,
    status: "ok",
    url: `http://${config.host}:${config.port}`
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildHomePage(config: AppConfig) {
  const appName = escapeHtml(config.appName);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${appName}</title>
    <style>
      :root {
        color-scheme: light;
        font-family: "Segoe UI", sans-serif;
      }

      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background:
          radial-gradient(circle at top, #d9f3ff, transparent 40%),
          linear-gradient(180deg, #f7fbff 0%, #eef5ff 100%);
        color: #12314d;
      }

      main {
        width: min(720px, calc(100% - 32px));
        padding: 32px;
        border-radius: 24px;
        background: rgba(255, 255, 255, 0.88);
        box-shadow: 0 18px 50px rgba(18, 49, 77, 0.14);
      }

      .eyebrow {
        margin: 0 0 12px;
        font-size: 0.85rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #45749f;
      }

      h1 {
        margin: 0 0 12px;
        font-size: clamp(2rem, 5vw, 3.25rem);
      }

      p {
        line-height: 1.6;
      }

      ul {
        padding-left: 20px;
      }

      code {
        padding: 0.15rem 0.4rem;
        border-radius: 999px;
        background: #e4f1ff;
      }

      a {
        color: #005ca8;
      }
    </style>
  </head>
  <body>
    <main>
      <p class="eyebrow">Starter Page</p>
      <h1>${appName}</h1>
      <p>This is the first page scaffold for the project. You can turn this into a landing page, dashboard, or handoff page for a frontend framework later.</p>
      <ul>
        <li>Top page: <code>/</code></li>
        <li>Health API: <code>/api/health</code></li>
      </ul>
      <p>Next step: replace this HTML with the real first screen and extend the API to match your feature work.</p>
      <p><a href="/api/health">Open the health API</a></p>
    </main>
  </body>
</html>`;
}

export function routeRequest(url: string | undefined, config: AppConfig): AppResponse {
  const pathname = new URL(url ?? "/", `http://${config.host}:${config.port}`).pathname;

  if (pathname === "/") {
    return {
      body: buildHomePage(config),
      headers: {
        "content-type": "text/html; charset=utf-8"
      },
      statusCode: 200
    };
  }

  if (pathname === "/api/health") {
    return {
      body: JSON.stringify(buildStatus(config)),
      headers: {
        "content-type": "application/json; charset=utf-8"
      },
      statusCode: 200
    };
  }

  return {
    body: JSON.stringify({
      error: "Not Found",
      path: pathname
    }),
    headers: {
      "content-type": "application/json; charset=utf-8"
    },
    statusCode: 404
  };
}

export function createApp(config: AppConfig) {
  return createServer((request, response) => {
    const appResponse = routeRequest(request.url, config);
    response.writeHead(appResponse.statusCode, appResponse.headers);
    response.end(appResponse.body);
  });
}
