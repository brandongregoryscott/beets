import { majorScale } from "evergreen-ui";

const getTrackListWidth = (): number => {
    return window.innerWidth - majorScale(25);
};

export { getTrackListWidth };
