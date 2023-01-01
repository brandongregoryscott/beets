/* eslint-disable @typescript-eslint/consistent-type-imports */
declare module "opus-media-recorder" {
    declare class OpusMediaRecorder extends MediaRecorder {
        constructor(
            stream: MediaStream,
            options?: MediaRecorderOptions,
            workerOptions?: OpusMediaRecorderWorkerOptions
        );
    }

    // eslint-disable-next-line collation/no-inline-export
    export interface OpusMediaRecorderWorkerOptions {
        encoderWorkerFactory: () => Worker;
        OggOpusEncoderWasmPath: string;
        WebMOpusEncoderWasmPath: string;
    }

    export = OpusMediaRecorder;
}

namespace jest {
    type MatcherNotCompatibleWithType =
        "Matcher is not implemented for the given type.";

    type ToHaveCountArgs<K, V> =
        | [expected: number]
        | [filter: (value: V, key: K) => boolean, expected];

    interface Matchers<R, T> {
        toBeOrderedByIndex: T extends Immutable.Collection<infer K, infer V>
            ? (filter?: (value: V, key: K) => boolean) => R
            : MatcherNotCompatibleWithType;
        toHaveCount: T extends Immutable.Collection<infer K, infer V>
            ? (...args: ToHaveCountArgs<K, V>) => R
            : MatcherNotCompatibleWithType;
    }
}

declare module "*.md";
