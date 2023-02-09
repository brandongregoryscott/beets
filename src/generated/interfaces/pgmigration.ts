interface Pgmigration {
    id: number;
    name: string;
    run_on: string;
}

export type { Pgmigration };
