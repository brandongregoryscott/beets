import { Factory } from "fishery";

class BaseFactory<T> extends Factory<T> {
    rewind(): this {
        this.rewindSequence();
        return this;
    }
}

export { BaseFactory };
