interface AnimationDurationProps {
  animationDuration: number;
  setAnimationDuration: (duration: number) => void;
}

export const AnimationDuration = ({ animationDuration, setAnimationDuration }: AnimationDurationProps) => {
  return (
    <div className="flex items-center gap-2 w-fit ml-auto">
      <label htmlFor="animationDuration">Animation Duration:</label>
      <input
        id="animationDuration"
        className="flex items-center gap-2 w-fit ml-auto bg-black text-white rounded p-1 outline-none border-none"
        type="number"
        value={animationDuration}
        onChange={(e) => setAnimationDuration(parseInt(e.target.value))}
        placeholder="Enter animation duration (e.g., 2)"
      />
    </div>
  )
}
