import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import PublicHome from "./pages/PublicHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddCase from "./pages/AddCase";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import About from "./pages/About";

const queryClient = new QueryClient();

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Outlet />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <PublicHome />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        ),
      },
      {
        path: "add-case",
        element: (
          <ProtectedRoute>
            <Layout>
              <AddCase />
            </Layout>
          </ProtectedRoute>
        ),
      },
      {
        path: "history",
        element: (
          <ProtectedRoute>
            <Layout>
              <History />
            </Layout>
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
});

const App = () => <RouterProvider router={router} />;

export default App;
