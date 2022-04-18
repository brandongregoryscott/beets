const format = (value: string, ...args: any[]) => {
    let index = 0;
    return value.replace(/%s/g, () => args[index++]);
};

export { format };
