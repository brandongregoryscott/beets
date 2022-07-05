declare global {
    interface Window {
        analytics: import("@segment/analytics-next").Analytics;
    }
}

export {};
