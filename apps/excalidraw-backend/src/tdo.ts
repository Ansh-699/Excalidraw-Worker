import { DurableObject } from "cloudflare:workers";

export class ExcalidrawWebSocketServer extends DurableObject<Cloudflare> {
  count = 0;
  constructor(ctx: DurableObjectState, env: Cloudflare) {
    super(ctx, env);
  }

  async increment() {
    this.count++;
    return this.count;
  }
}
