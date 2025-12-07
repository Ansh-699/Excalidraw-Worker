import { Hono } from "hono";
export { ExcalidrawWebSocketServer } from "./durable-object";
import { z } from "zod";

const ArraySchema = z.object({
  data: z.array(z.any()),
});

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/api/get-elements/:drawingId", async (c) => {
  const drawingId = c.req.param("drawingId");
  const durableObjectId = c.env.DURABLE_OBJECT.idFromName(drawingId);
  const stub = c.env.DURABLE_OBJECT.get(durableObjectId);
  const elements = await stub.getElements();
  return c.json(ArraySchema.parse(elements));
});

app.get("/api/ws/:drawingId", (c) => {
  const drawingId = c.req.param("drawingId");
  const upgradeHeader = c.req.header("Upgrade");
  if (!upgradeHeader || upgradeHeader !== "websocket") {
    return c.text("Expected websocket", 400);
  }

  const id = c.env.DURABLE_OBJECT.idFromName(drawingId);
  const stub = c.env.DURABLE_OBJECT.get(id);

  return stub.fetch(c.req.raw);
});

export default app;
