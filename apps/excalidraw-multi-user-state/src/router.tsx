import {
  createRootRoute,
  createRouter,
  createRoute,
  Outlet,
} from "@tanstack/react-router";

import ExcalidrawComponent from "./pages/Excalidraw";
import Index from "./pages/Index";

// Define the root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
  notFoundComponent: () => <div className="p-4 text-center">Page Not Found</div>,
});

const excalidrawRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/excalidraw/$id",
  component: ExcalidrawComponent,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
});

// Define route tree
const routeTree = rootRoute.addChildren([indexRoute, excalidrawRoute]);

// Create router instance
const router = createRouter({ routeTree });

// Export the router and routes for use elsewhere
export { router, rootRoute };
