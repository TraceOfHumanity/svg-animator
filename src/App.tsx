import { MainContainer } from "./components/MainContainer";
import { Title } from "./components/Title";
import { InputFiles } from "./components/InputFiles";
import { AnimationDuration } from "./components/AnimationDuration";
import { ListOfFrames } from "./components/ListOfFrames";
import { FrameInterval } from "./components/FrameInterval";
import { useAnimationGenerator } from "./hooks/useAnimationGenerator";
import { useDNDSortable } from "./hooks/useDNDSortable";


function App() {
  const { svgs,setSvgs, animationDuration, frameInterval, setAnimationDuration, setFrameInterval, handleSvgUpload, generateAnimation, downloadSVG } = useAnimationGenerator()
  const { handleDragEnd } = useDNDSortable(svgs, setSvgs)

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
