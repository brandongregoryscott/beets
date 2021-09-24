import { Constructor } from "types/constructor";
import { Record } from "immutable";

type TypeOf<TRecord> = TRecord extends Record.Factory<infer X> ? X : never;

/**
 * Mixin class to hold base functionality of Immutable.Record classes
 *
 * @see https://www.typescriptlang.org/docs/handbook/mixins.html
 * @template TRecord
 * @param {TRecord} Base Base Immutable.Record class to extend from
 * @returns
 */
function BaseRecord<TRecord extends Constructor>(Base: TRecord) {
    return class BaseRecord extends Base {
        public toPOJO(): TypeOf<TRecord> {
            return this.asTypedRecord().toJS() as TypeOf<TRecord>;
        }

        /**
         * Cast hack to get correct typing for base `Record` functions. Can revisit later.
         */
        private asTypedRecord(): Record<TypeOf<TRecord>> {
            return this as any as Record<TypeOf<TRecord>>;
        }
    };
}

export { BaseRecord };
