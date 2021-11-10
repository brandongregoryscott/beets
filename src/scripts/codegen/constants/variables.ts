const keyMirror = <T extends Record<string, null>>(
    object: T
): Record<keyof T, string> => {
    const keys = Object.keys(object);
    const outputObject: Record<string, string> = {};
    keys.forEach((key: string) => {
        outputObject[key] = key;
    });

    return outputObject as Record<keyof T, string>;
};

const Variables = keyMirror({
    createOrUpdate: null,
    id: null,
    isNilOrEmpty: null,
    isTemporaryId: null,
    enabled: null,
    defaultFilter: null,
    filter: null,
    mutateAsync: null,
    onError: null,
    onSettled: null,
    onSuccess: null,
});

export { Variables };
