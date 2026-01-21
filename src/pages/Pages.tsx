"use client";

import {
  Router,
  RouterProvider,
  Route,
  RootRoute,
} from "@tanstack/react-router";

const rootRoute = new RootRoute({
  component: () => <div>Root Layout</div>,
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => <div>Home Page</div>,
});

const router = new Router({
  routeTree: rootRoute.addChildren([homeRoute]),
});

export default function Pages() {
  return <RouterProvider router={router} />;
}
