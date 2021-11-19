const hash = (value: string): number => {
    let hash = 5381;
    let i = value.length;

    while (i > 0) {
        hash = (hash * 33) ^ value.charCodeAt(--i);
    }

    return hash >>> 0;
};

const valueByHash = <T>(key: string, items: T[]): T =>
    items[hash(key) % items.length];

export { hash, valueByHash };
