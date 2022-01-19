interface TraceableEvent<E = object, C = any, T = any>
    extends React.BaseSyntheticEvent<E, C, T> {
    /** What is the identifier or name of the component where this event originated? */
    source: string;
}

export type { TraceableEvent };
