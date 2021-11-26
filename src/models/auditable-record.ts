import { Auditable } from "interfaces/auditable";
import { BaseRecord } from "models/base-record";
import { Constructor } from "types/constructor";
import { isPersisted } from "utils/auditable-utils";

export type AuditableRecordType = Immutable.Record<Auditable>;

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
    return class AuditableRecord extends BaseRecord(Base) {
        public getUpdatedOn(): string | undefined {
            return this.updated_on ?? this.created_on;
        }

        public isPersisted(): boolean {
            return isPersisted(this);
        }

        public removeId(): this {
            return this.asRecord<Auditable>().merge({
                id: undefined,
            }) as any;
        }
    };
}

export { AuditableRecord };
