import assert from "node:assert/strict";

import { buildStatus, routeRequest } from "./server.js";

const config = {
  appName: "starter-app",
  host: "127.0.0.1",
  port: 3000
};

assert.deepEqual(
  buildStatus(config),
  {
    appName: "starter-app",
    status: "ok",
    url: "http://127.0.0.1:3000"
  }
);

const homePage = routeRequest("/", config);
assert.equal(homePage.statusCode, 200);
assert.equal(homePage.headers["content-type"], "text/html; charset=utf-8");
assert.match(homePage.body, /Starter Page/);
assert.match(homePage.body, /starter-app/);
assert.match(homePage.body, /\/api\/health/);

const healthApi = routeRequest("/api/health", config);
assert.equal(healthApi.statusCode, 200);
assert.equal(healthApi.headers["content-type"], "application/json; charset=utf-8");
assert.deepEqual(JSON.parse(healthApi.body), buildStatus(config));

const missingRoute = routeRequest("/missing", config);
assert.equal(missingRoute.statusCode, 404);
assert.deepEqual(JSON.parse(missingRoute.body), {
  error: "Not Found",
  path: "/missing"
});

console.log("server.test.ts passed");
