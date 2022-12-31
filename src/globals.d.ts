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

    interface Matchers<R, T> {
        toHaveCount: T extends Immutable.Collection<infer K, infer V>
            ? (filter: (value: V, key: K) => boolean, expected: number) => R
            : MatcherNotCompatibleWithType;
        toHaveCount: T extends Immutable.Collection<K, V>
            ? (expected: number) => R
            : MatcherNotCompatibleWithType;
    }
}

declare module "*.md";
