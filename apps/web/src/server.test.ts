import assert from "node:assert/strict";

import { buildStatus } from "./server.js";

assert.deepEqual(
  buildStatus({
    appName: "starter-app",
    host: "127.0.0.1",
    port: 3000
  }),
  {
    appName: "starter-app",
    status: "ok",
    url: "http://127.0.0.1:3000"
  }
);

console.log("server.test.ts passed");
