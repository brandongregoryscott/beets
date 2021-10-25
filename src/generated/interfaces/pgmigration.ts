interface Pgmigration {
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    name: string;
    run_on: string;
}

export type { Pgmigration };
