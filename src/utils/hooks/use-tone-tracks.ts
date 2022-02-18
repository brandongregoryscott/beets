import { StepType } from "@brandongregoryscott/reactronica";
import { List } from "immutable";
import { ToneStep } from "interfaces/tone-step";
import { ToneTrack } from "interfaces/tone-track";
import { useAtom } from "jotai";
import { isEqual, pick } from "lodash";
import { FileRecord } from "models/file-record";
import { InstrumentRecord } from "models/instrument-record";
import { TrackRecord } from "models/track-record";
import { TrackSectionRecord } from "models/track-section-record";
import { TrackSectionStepRecord } from "models/track-section-step-record";
import { useEffect } from "react";
import * as Tone from "tone";
import { ToneStateAtom } from "utils/atoms/tone-state-atom";
import { getFileById, toInstrumentMap, toSequencerMap } from "utils/file-utils";
import {
    toInstrumentStepTypes,
    toSequencerStepTypes,
} from "utils/track-section-step-utils";
import { getByTrack } from "utils/track-section-utils";

interface UseToneTracksOptions {
    files?: List<FileRecord>;
    instruments?: List<InstrumentRecord>;
    trackSectionSteps?: List<TrackSectionStepRecord>;
    trackSections?: List<TrackSectionRecord>;
    tracks?: List<TrackRecord>;
}

interface UseToneTracksResult {}

const useToneTracks = (options?: UseToneTracksOptions): UseToneTracksResult => {
    return {};
};

export { useToneTracks };
