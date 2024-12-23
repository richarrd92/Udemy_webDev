// Simple server using Bun framework

import { serve } from "bun"; // import bun

// launch server
serve({
  fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/") {
      return new Response("Bun server: Hello world from main page", {
        status: 200,
      });
    } else if (url.pathname === "/other") {
      return new Response("Bun server: Hello world from other page", {
        status: 200,
      });
    } else {
      return new Response("Bun server: 404 Not found", {
        status: 404,
      });
    }
  },

  port: 3000,
  hostname: "127.0.0.1",
});
