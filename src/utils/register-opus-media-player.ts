import MediaRecorder from "opus-media-recorder";

// opus-media-recorder options
const workerOptions = {
    encoderWorkerFactory: function () {
        return new Worker(
            process.env.PUBLIC_URL + "/opus-media-recorder/encoderWorker.umd.js"
        );
    },
    OggOpusEncoderWasmPath:
        process.env.PUBLIC_URL + "/opus-media-recorder/OggOpusEncoder.wasm",
    WebMOpusEncoderWasmPath:
        process.env.PUBLIC_URL + "/opus-media-recorder/WebMOpusEncoder.wasm",
};
