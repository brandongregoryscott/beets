interface Project {
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
    name: string;
}

export type { Project };
