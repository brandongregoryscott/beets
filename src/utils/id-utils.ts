import { isNotNilOrEmpty } from "utils/core-utils";
import * as uuid from "uuid";

const generateId = (): string => uuid.v4();

const isUuid = (value?: string) =>
    isNotNilOrEmpty(value) && uuid.validate(value);

export { generateId, isUuid };
