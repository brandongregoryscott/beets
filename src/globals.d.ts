declare module "opus-media-recorder" {
    declare class OpusMediaRecorder extends MediaRecorder {
        constructor(
            stream: MediaStream,
            options?: MediaRecorderOptions,
            workerOptions?: OpusMediaRecorderWorkerOptions
        );
    }

    export interface OpusMediaRecorderWorkerOptions {
        encoderWorkerFactory: () => Worker;
        OggOpusEncoderWasmPath: string;
        WebMOpusEncoderWasmPath: string;
    }

    export = OpusMediaRecorder;
}

declare module "*.md";
