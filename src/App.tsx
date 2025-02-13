import { MainContainer } from "./components/MainContainer";
import { Title } from "./components/Title";
import { useState } from "react";
import { saveAs } from "file-saver";
import { v4 as uuidv4 } from 'uuid';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SvgItem } from "./components/SvgItem";


function App() {
  const [svgs, setSvgs] = useState<{id: string, name: string, svg: string }[]>([]);
  const [animationDuration, setAnimationDuration] = useState("2s");

  const sortSvgs = (items: { id: string, name: string, svg: string }[]) => {
    return items.sort((a, b) => {
      const numA = parseInt(a.name.split('.')[0], 10);
      const numB = parseInt(b.name.split('.')[0], 10);
      return numA - numB;
    });
  };

  const handleSvgUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newSvgs: { id: string, name: string, svg: string }[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newSvgs.push({ id: uuidv4(), name: file.name, svg: e.target?.result as string });
          if (newSvgs.length === files.length) {
            setSvgs((prevSvgs) => sortSvgs([...prevSvgs, ...newSvgs]));
          }
        };
        reader.readAsText(file);
      });
    }
  };

  const generateAnimation = () => {
    const totalFrames = svgs.length;
    return svgs.map((svg, index) => {
      const startTime = (index / totalFrames).toFixed(3);
      const endTime = ((index + 1) / totalFrames).toFixed(3);
      return `
        <g id="group${index + 1}" opacity="0">${svg.svg}</g>
        <animate href="#group${index + 1}" attributeName="opacity" values="0;0;1;1;0;0" dur="${animationDuration}" repeatCount="indefinite" keyTimes="0;${startTime};${startTime};${endTime};${endTime};1" fill="freeze"></animate>
      `;
    }).join('');
  };

  const downloadSVG = () => {
    const svgContent = `
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        ${generateAnimation()}
      </svg>
    `;
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    saveAs(blob, "animated.svg");
  };

  // const sensors = useSensors(
  //   useSensor(PointerSensor),
  //   useSensor(KeyboardSensor, {
  //     coordinateGetter: sortableKeyboardCoordinates,
  //   }),
  // );

  const sortList = (
    items: { id: string, name: string, svg: string }[],
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
    // if (over.data?.current?.sortable?.index !== undefined) {
    //   setActiveExerciseIndex(over.data.current.sortable.index);
    // }
  };

  return (
    <MainContainer>
      <Title />
      <input type="file" accept="image/svg+xml" multiple onChange={handleSvgUpload} />
      <input
        type="text"
        value={animationDuration}
        onChange={(e) => setAnimationDuration(e.target.value)}
        placeholder="Enter animation duration (e.g., 2s)"
      />
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden bg-red-500 min-h-56">
        <DndContext
          // sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToHorizontalAxis]}
        >
          <SortableContext
            items={svgs.map((svg) => svg.id)}
            strategy={horizontalListSortingStrategy}
          >
            {svgs.map((svg, index) => (
              <SvgItem key={index} id={svg.id} svg={svg.svg} name={svg.name} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <button onClick={downloadSVG}>Download SVG</button>
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <g dangerouslySetInnerHTML={{ __html: generateAnimation() }} />
      </svg>
    </MainContainer>
  );
}

export default App;
