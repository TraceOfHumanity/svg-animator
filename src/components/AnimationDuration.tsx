interface AnimationDurationProps {
  animationDuration: string;
  setAnimationDuration: (duration: string) => void;
}

export const AnimationDuration = ({ animationDuration, setAnimationDuration }: AnimationDurationProps) => {
  return (
    <input
      className="flex items-center gap-2 w-fit ml-auto bg-black text-white rounded p-1 outline-none border-none"
      type="text"
      value={animationDuration}
      onChange={(e) => setAnimationDuration(e.target.value)}
      placeholder="Enter animation duration (e.g., 2s)"
    />
  )
}
