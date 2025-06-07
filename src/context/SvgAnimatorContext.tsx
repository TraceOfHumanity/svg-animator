import { createContext } from "react";
import { DragEndEvent } from "@dnd-kit/core";
import { Svg } from "@/types/svgAnimatorTypes";

export const SvgAnimatorContext = createContext<{
  svgs: Svg[];
  setSvgs: (svgs: Svg[]) => void;
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
