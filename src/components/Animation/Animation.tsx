import { DragEndEvent } from "@dnd-kit/core";
import { AnimationDuration } from "./AnimationDuration";
import { FrameInterval } from "./AnimationFrameInterval";
import { FramesList } from "./FramesList/FramesList";

type AnimationProps = {
  svgs: { id: string; name: string; svg: string }[];
  animationDuration: number;
  setAnimationDuration: (duration: number) => void;
  frameInterval: number;
  setFrameInterval: (interval: number) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  generateAnimation: () => string;
};

export const Animation = ({
  svgs,
  animationDuration,
  setAnimationDuration,
  frameInterval,
  setFrameInterval,
  handleDragEnd,
  generateAnimation,
}: AnimationProps) => {
  if (svgs.length === 0) return <div>No SVGs uploaded</div>;

  return (
    <div>
      <Animation.Duration
        animationDuration={animationDuration}
        setAnimationDuration={setAnimationDuration}
      />
      <Animation.FrameInterval
        frameInterval={frameInterval}
        setFrameInterval={setFrameInterval}
        svgs={svgs}
      />
      <Animation.FramesList svgs={svgs} handleDragEnd={handleDragEnd} />

      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <g dangerouslySetInnerHTML={{ __html: generateAnimation() }} />
      </svg>
    </div>
  );
};

Animation.Duration = AnimationDuration;
Animation.FrameInterval = FrameInterval;
Animation.FramesList = FramesList;
