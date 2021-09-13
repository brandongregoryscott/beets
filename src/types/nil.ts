type nil<T = never> = T extends never ? null | undefined : T | null | undefined;

export type { nil };
