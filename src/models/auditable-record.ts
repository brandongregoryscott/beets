import { Auditable } from "interfaces/auditable";
import { Constructor } from "types/constructor";
import { isNilOrEmpty, isTemporaryId } from "utils/core-utils";

/**
 * Mixin class to hold base functionality of auditable Immutable.Record classes
 *
 * @see https://www.typescriptlang.org/docs/handbook/mixins.html
 * @template TRecord
 * @param {TRecord} Base Base Immutable.Record class to extend from
 * @returns
 */
function AuditableRecord<TRecord extends Constructor<Auditable>>(
    Base: TRecord
) {
    return class AuditableRecord extends Base {
        public getUpdatedOn(): string | undefined {
            return this.updated_on ?? this.created_on;
        }

        public isPersisted(): boolean {
            return !isNilOrEmpty(this.id) && !isTemporaryId(this.id);
        }
    };
}

export { AuditableRecord };
