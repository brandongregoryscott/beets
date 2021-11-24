import { Auditable } from "interfaces/auditable";
import { isNotNilOrEmpty } from "utils/core-utils";

const isPersisted = (value: Auditable): boolean =>
    isNotNilOrEmpty(value.created_on);

export { isPersisted };
