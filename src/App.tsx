import { SvgAnimator } from "./components/SvgAnimator";
import { useAnimationGenerator } from "./hooks/useAnimationGenerator";
import { useDNDSortable } from "./hooks/useDNDSortable";

function App() {
  const {
    svgs,
    setSvgs,
    animationDuration,
    frameInterval,
    setAnimationDuration,
    setFrameInterval,
    handleSvgUpload,
    generateAnimation,
    downloadSVG,
  } = useAnimationGenerator();
  const { handleDragEnd } = useDNDSortable(svgs, setSvgs);

  return (
    <SvgAnimator>
      <SvgAnimator.Title />
      <SvgAnimator.FileInput handleSvgUpload={handleSvgUpload} />
      <SvgAnimator.Animation
        svgs={svgs}
        animationDuration={animationDuration}
        setAnimationDuration={setAnimationDuration}
        frameInterval={frameInterval}
        setFrameInterval={setFrameInterval}
        handleDragEnd={handleDragEnd}
        generateAnimation={generateAnimation}
      />
      {svgs.length > 0 && (
        <SvgAnimator.DownloadSvgButton downloadSVG={downloadSVG} />
      )}
    </SvgAnimator>
  );
}

export default App;
