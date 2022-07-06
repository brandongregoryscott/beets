import type { Auditable } from "interfaces/auditable";

interface User extends Auditable {
    email: string;
}

export type { User };
