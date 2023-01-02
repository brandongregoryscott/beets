import type { GeneratorFnOptions, HookFn } from "fishery";
import { Factory } from "fishery";
import Immutable from "immutable";

class BaseFactory<T, I = any, C = T> extends Factory<T, I, C> {
    constructor(generator: (opts: GeneratorFnOptions<T, I, C>) => T) {
        super(generator);
    }

    afterBuild(afterBuildFn: HookFn<T>): this {
        const value = this.build();
        if (Immutable.isRecord(value)) {
            afterBuildFn(value.asImmutable());
        }

        return this;
    }

    rewind(): this {
        this.rewindSequence();
        return this;
    }
}

export { BaseFactory };
