import { MainContainer } from "./components/MainContainer";
import { Title } from "./components/Title";
import { saveAs } from "file-saver";
import {
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { InputFiles } from "./components/InputFiles";
import { AnimationDuration } from "./components/AnimationDuration";
import { ListOfFrames } from "./components/ListOfFrames";
import { FrameInterval } from "./components/FrameInterval";
import { useAnimationGenerator } from "./hooks/useAnimationGenerator";


function App() {
  const {svgs, setSvgs, animationDuration, frameInterval, setAnimationDuration, setFrameInterval, handleSvgUpload} = useAnimationGenerator()

  const generateAnimation = () => {
    const filteredSvgs = svgs.filter((_, index) => index % frameInterval === 0);
    const totalFrames = filteredSvgs.length;

    return filteredSvgs.map((svg, index) => {
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

  const sortList = (
    items: { id: string, name: string, svg: string }[],
    active: { id: UniqueIdentifier },
    over: { id: UniqueIdentifier },
  ) => {
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);

    return arrayMove(items, oldIndex, newIndex);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const sortedForm = sortList(svgs, active, over);
      setSvgs(sortedForm);
    }
  };

  return (
    <MainContainer>
      <Title />
      <InputFiles handleSvgUpload={handleSvgUpload} />
      {svgs.length > 0 && (
        <>
          <AnimationDuration animationDuration={animationDuration} setAnimationDuration={setAnimationDuration} />
          <FrameInterval frameInterval={frameInterval} setFrameInterval={setFrameInterval} svgs={svgs} />
          <ListOfFrames svgs={svgs} handleDragEnd={handleDragEnd} />
          <button className="flex items-center gap-2 w-fit ml-auto bg-black text-white rounded p-1" onClick={downloadSVG}>Download SVG</button>
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <g dangerouslySetInnerHTML={{ __html: generateAnimation() }} />
          </svg>
        </>
      )}
    </MainContainer>
  )
}

export default App;
