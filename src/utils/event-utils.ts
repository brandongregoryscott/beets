import type { TraceableEvent } from "interfaces/traceable-event";
import type React from "react";
import { isNotNilOrEmpty } from "utils/core-utils";

const attachEventSource =
    (source: string) => (event: React.BaseSyntheticEvent) => {
        (event as TraceableEvent).source = source;
    };

const isEventFromDialog = (event: React.BaseSyntheticEvent): boolean =>
    isTraceableEvent(event) && event.source === "Dialog";

const isTraceableEvent = (
    event: React.BaseSyntheticEvent
): event is TraceableEvent => isNotNilOrEmpty((event as TraceableEvent).source);

export { attachEventSource, isEventFromDialog, isTraceableEvent };
