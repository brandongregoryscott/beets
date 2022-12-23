import { VirtualizedTrackTimeCard } from "components/tracks/track-time/virtualized-track-time-card";
import { majorScale } from "evergreen-ui";
import { range } from "lodash";
import type { ForwardedRef } from "react";
import React, { forwardRef, useMemo } from "react";
import type { ListOnScrollProps } from "react-window";
import { FixedSizeList } from "react-window";
import type { SelectorMap } from "ui-box";
import Box from "ui-box";

interface VirtualizedTrackTimeProps {
    onScroll: (props: ListOnScrollProps) => void;
    stepCount: number;
}

const selectors: SelectorMap = {
    // Hide scrollbars on Chrome
    "> div::-webkit-scrollbar": { display: "none" },
};

const style: React.CSSProperties = {
    // overflowY: "hidden",
    // Hide scrollbars on Edge/IE
    msOverflowStyle: "none",
    // Hide scrollbars on Firefox
    scrollbarWidth: "none",
};

const VirtualizedTrackTime = forwardRef(
    (props: VirtualizedTrackTimeProps, ref: ForwardedRef<FixedSizeList>) => {
        const { onScroll, stepCount } = props;
        const items = useMemo(() => range(0, stepCount), [stepCount]);
        return (
            <Box selectors={selectors}>
                <FixedSizeList
                    height={majorScale(2)}
                    itemCount={stepCount}
                    itemData={items}
                    itemSize={majorScale(2)}
                    layout="horizontal"
                    onScroll={onScroll}
                    ref={ref}
                    style={style}
                    width={1000}>
                    {VirtualizedTrackTimeCard}
                </FixedSizeList>
            </Box>
        );
    }
);

VirtualizedTrackTime.displayName = "VirtualizedTrackTime";

export { VirtualizedTrackTime };
