import { Auditable } from "interfaces/auditable";
import { Constructor } from "types/constructor";
import { isNilOrEmpty } from "utils/collection-utils";
import { isTemporaryId } from "utils/core-utils";

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
        /**
         * Placeholder id to associate entities before being persisted to the database
         */
        protected temporaryId: string | undefined;

        public getUpdatedOn(): string | undefined {
            return this.updated_on ?? this.created_on;
        }

        public getTemporaryId(): string | undefined {
            return this.temporaryId;
        }

        public isPersisted(): boolean {
            return !isNilOrEmpty(this.id) && !isTemporaryId(this.id);
        }

        public setTemporaryId(temporaryId: string | undefined): this {
            this.temporaryId = temporaryId;
            return this;
        }
    };
}

export { AuditableRecord };
