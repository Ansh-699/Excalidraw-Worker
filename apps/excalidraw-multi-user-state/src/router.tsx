import {
  createRootRoute,
  createRouter,
  createRoute,
  Outlet,
} from "@tanstack/react-router";

import ExcalidrawComponent from "./pages/Excalidraw";

// Define the root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

const excalidrawRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/excalidraw/$id",
  component: ExcalidrawComponent,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <div style={{ padding: "20px", fontFamily: "system-ui" }}>
      <h1>Excalidraw Multi-User</h1>
      <p>Enter a room ID to start drawing:</p>
      <button
        onClick={() => {
          const randomId = Math.random().toString(36).substring(7);
          window.location.href = `/excalidraw/${randomId}`;
        }}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Create New Room
      </button>
    </div>
  ),
});

// Define route tree
const routeTree = rootRoute.addChildren([indexRoute, excalidrawRoute]);

// Create router instance
const router = createRouter({ routeTree });

// Export the router and routes for use elsewhere
export { router, rootRoute };
