import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "app";
import { reportWebVitals } from "reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "evergreen-ui";
import { theme } from "theme";
import "./index.css";
import { registerIndexStyleMutation } from "utils/register-index-style-mutation";

registerIndexStyleMutation();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});
const root = createRoot(document.getElementById("root")!);

root.render(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider value={theme}>
            <App />
        </ThemeProvider>
    </QueryClientProvider>
);
