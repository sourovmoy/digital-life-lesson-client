import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/Routes.jsx";
import AuthProvider from "./providers/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./providers/ThemeProvider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
          <Toaster 
            position="top-right" 
            reverseOrder={false}
            toastOptions={{
              // Default options for all toasts
              duration: 4000,
              style: {
                background: '#BC6C25',
                color: '#ffffff',
                border: '2px solid #DDA15E',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(188, 108, 37, 0.3)',
                fontWeight: '600',
                fontSize: '14px',
                padding: '12px 16px',
              },
              // Success toast styling
              success: {
                duration: 3000,
                style: {
                  background: '#BC6C25',
                  color: '#ffffff',
                  border: '2px solid #DDA15E',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(188, 108, 37, 0.4)',
                },
                iconTheme: {
                  primary: '#ffffff',
                  secondary: '#BC6C25',
                },
              },
              // Error toast styling
              error: {
                duration: 4000,
                style: {
                  background: '#ef4444',
                  color: '#ffffff',
                  border: '2px solid #BC6C25',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(239, 68, 68, 0.4)',
                },
                iconTheme: {
                  primary: '#ffffff',
                  secondary: '#ef4444',
                },
              },
              // Loading toast styling
              loading: {
                style: {
                  background: '#DDA15E',
                  color: '#283618',
                  border: '2px solid #BC6C25',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(221, 161, 94, 0.4)',
                },
              },
            }}
          />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
