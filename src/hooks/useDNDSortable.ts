import {DragEndEvent, UniqueIdentifier} from '@dnd-kit/core';
import {arrayMove} from '@dnd-kit/sortable';
import {Svg} from '@/types/svgAnimatorTypes';

export const useDNDSortable = (svgs: Svg[], setSvgs: (svgs: Svg[]) => void) => {
  const sortList = (
    items: {id: string; name: string; svg: string}[],
    active: {id: UniqueIdentifier},
    over: {id: UniqueIdentifier},
  ) => {
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    return arrayMove(items, oldIndex, newIndex);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const {active, over} = event;
    if (!over) return;

    if (active.id !== over.id) {
      const sortedForm = sortList(svgs, active, over);
      setSvgs(sortedForm);
    }
  };

  return {
    sortList,
    handleDragEnd,
  };
};
