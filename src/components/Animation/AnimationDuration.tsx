import { useContext } from "react";
import { SvgAnimatorContext } from "@/context/SvgAnimatorContext";

export const AnimationDuration = () => {
  const { animationDuration, setAnimationDuration } =
    useContext(SvgAnimatorContext);
  return (
    <div className="flex items-center gap-2 w-fit ml-auto">
      <label htmlFor="animationDuration">Animation Duration:</label>
      <input
        id="animationDuration"
        className="flex items-center gap-2 w-20 ml-auto bg-black text-white rounded p-1 outline-none border-none"
        type="number"
        step={0.1}
        min={0.1}
        value={animationDuration}
        onChange={(e) => setAnimationDuration(parseFloat(e.target.value))}
        placeholder="Enter animation duration (e.g., 2)"
      />
    </div>
  );
};
