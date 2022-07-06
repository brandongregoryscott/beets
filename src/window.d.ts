declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/consistent-type-imports
        analytics: import("@segment/analytics-next").Analytics;
    }
}

// eslint-disable-next-line collation/no-inline-export
export {};
