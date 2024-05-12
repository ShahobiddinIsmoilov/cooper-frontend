import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/carousel/styles.css";
import "./index.css";
import Layout from "./Layout";
import { theme } from "./theme";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LanguageProvider from "./contexts/LanguageContext";
import AuthProvider from "./contexts/AuthContext";
import DialogProvider from "./contexts/DialogContext";
import CustomModalProvider from "./contexts/CustomModalContext";
import WindowSizeProvider from "./contexts/WindowSizeContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <DialogProvider>
              <LanguageProvider>
                <WindowSizeProvider>
                  <CustomModalProvider>
                    <Layout />
                  </CustomModalProvider>
                </WindowSizeProvider>
              </LanguageProvider>
            </DialogProvider>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  );
}
