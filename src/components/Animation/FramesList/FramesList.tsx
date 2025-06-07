import { DndContext, closestCenter } from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FrameInterval } from "@/components/Animation/AnimationFrameInterval";
import { useContext } from "react";
import { SvgAnimatorContext } from "@/context/SvgAnimatorContext";
import { FrameItem } from "./FramesListFrameItem";

export const FramesList = () => {
  const { svgs, handleDragEnd } = useContext(SvgAnimatorContext);
  return (
    <div className="flex gap-4 overflow-x-auto overflow-y-hidden min-h-56">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToHorizontalAxis]}
      >
        <SortableContext
          items={svgs.map((svg) => svg.id)}
          strategy={horizontalListSortingStrategy}
        >
          {svgs.map((svg, index) => (
            <FramesList.FrameItem
              key={index}
              id={svg.id}
              svg={svg.svg}
              name={svg.name}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

FramesList.FrameInterval = FrameInterval;
FramesList.FrameItem = FrameItem;
