import { majorScale } from "evergreen-ui";

const getTrackListWidth = (): number => window.innerWidth - majorScale(27);

const getTrackTimeWidth = (): number => getTrackListWidth() - majorScale(7);

export { getTrackListWidth, getTrackTimeWidth };
