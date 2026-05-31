export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    // SPA fallback: serve index.html for any unmatched route
    if (response.status === 404) {
      const url = new URL(request.url);
      return env.ASSETS.fetch(new Request(new URL("/index.html", url.origin), request));
    }

    return response;
  },
};
