import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/dropzone/styles.css";
import "./index.css";
import Layout from "./Layout";
import { theme } from "./theme";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import DialogProvider from "./contexts/DialogContext";
import WindowSizeProvider from "./contexts/WindowSizeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <QueryClientProvider client={queryClient}>
        <WindowSizeProvider>
          <DialogProvider>
            <AuthProvider>
              <BrowserRouter>
                <Layout />
                <div id="portal" />
              </BrowserRouter>
            </AuthProvider>
          </DialogProvider>
        </WindowSizeProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}
