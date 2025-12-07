export default {
  fetch(request, env) {
    return (env as any).ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
