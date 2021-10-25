interface User {
    createdon?: string;
    createdbyid?: string;
    deletedon?: string;
    deletedbyid?: string;
    updatedon?: string;
    updatedbyid?: string;
    /**
     * Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    email: string;
}

export type { User };
