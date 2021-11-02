interface User {
    created_on?: string;
    created_by_id?: string;
    deleted_on?: string;
    deleted_by_id?: string;
    updated_on?: string;
    updated_by_id?: string;
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    email: string;
}

export type { User };
