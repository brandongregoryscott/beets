import { Auditable } from "interfaces/auditable";

interface Project extends Auditable {
    name: string;
}

export type { Project };
