import { Animation } from "./Animation/Animation";
import { SvgAnimatorDownloadSvgButton } from "./SvgAnimatorDownloadSvgButton";
import { SvgAnimatorFileInput } from "./SvgAnimatorFileInput";
import { Title } from "./SvgAnimatorTitle";
import { useAnimationGenerator } from "@/hooks/useAnimationGenerator";
import { useDNDSortable } from "@/hooks/useDNDSortable";
import { SvgAnimatorContext } from "@/context/SvgAnimatorContext";

export const SvgAnimator = ({ children }: { children: React.ReactNode }) => {
  const {
    svgs,
    setSvgs,
    animationDuration,
    setAnimationDuration,
    frameInterval,
    setFrameInterval,
    handleSvgUpload,
    generateAnimation,
    downloadSVG,
  } = useAnimationGenerator();
  const { handleDragEnd } = useDNDSortable(svgs, setSvgs);

  return (
    <SvgAnimatorContext.Provider
      value={{
        svgs,
        setSvgs,
        animationDuration,
        setAnimationDuration,
        frameInterval,
        setFrameInterval,
        handleSvgUpload,
        generateAnimation,
        downloadSVG,
        handleDragEnd,
      }}
    >
      <div className="container mx-auto h-screen max-h-screen px-4 py-8 md:px-8 md:py-16 flex flex-col gap-4 overflow-y-auto">
        {children}
      </div>
    </SvgAnimatorContext.Provider>
  );
};

SvgAnimator.Title = Title;
SvgAnimator.FileInput = SvgAnimatorFileInput;
SvgAnimator.Animation = Animation;
SvgAnimator.DownloadSvgButton = SvgAnimatorDownloadSvgButton;
