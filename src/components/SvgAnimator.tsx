import { createContext } from "react";
import { Animation } from "./Animation/Animation";
import { SvgAnimatorDownloadSvgButton } from "./SvgAnimatorDownloadSvgButton";
import { SvgAnimatorFileInput } from "./SvgAnimatorFileInput";
import { Title } from "./SvgAnimatorTitle";
import { useAnimationGenerator } from "../hooks/useAnimationGenerator";
import { DragEndEvent } from "@dnd-kit/core";
import { useDNDSortable } from "../hooks/useDNDSortable";

export const SvgAnimatorContext = createContext<{
  svgs: { id: string; name: string; svg: string }[];
  setSvgs: (svgs: { id: string; name: string; svg: string }[]) => void;
  animationDuration: number;
  setAnimationDuration: (duration: number) => void;
  frameInterval: number;
  setFrameInterval: (interval: number) => void;
  handleSvgUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  generateAnimation: () => string;
  downloadSVG: () => void;
  handleDragEnd: (event: DragEndEvent) => void;
}>({
  svgs: [],
  setSvgs: () => {},
  animationDuration: 1.5,
  setAnimationDuration: () => {},
  frameInterval: 1,
  setFrameInterval: () => {},
  handleSvgUpload: () => {},
  generateAnimation: () => "",
  downloadSVG: () => {},
  handleDragEnd: () => {},
});

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
