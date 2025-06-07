import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FramesListFrameItem } from "./FramesListFrameItem";
import { FrameInterval } from "../AnimationFrameInterval";

interface FramesListProps {
  svgs: { id: string; svg: string; name: string }[];
  handleDragEnd: (event: DragEndEvent) => void;
}

export const FramesList = ({ svgs, handleDragEnd }: FramesListProps) => {
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
            <FramesListFrameItem
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
