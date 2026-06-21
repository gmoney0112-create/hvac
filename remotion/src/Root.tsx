import React from "react";
import { Composition } from "remotion";
import { LoneStarPromo } from "./LoneStarVideo";

export const Root: React.FC = () => (
  <>
    <Composition id="LoneStarPromo" component={LoneStarPromo} durationInFrames={1800} fps={30} width={1920} height={1080} />
    <Composition id="LoneStarShort" component={LoneStarPromo} durationInFrames={900} fps={30} width={1080} height={1080} defaultProps={{ variant: "square" }} />
  </>
);
