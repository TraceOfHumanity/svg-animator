interface FrameIntervalProps {
  frameInterval: number;
  setFrameInterval: (interval: number) => void;
  svgs: { id: string, name: string, svg: string }[];
}

export const FrameInterval = ({ frameInterval, setFrameInterval, svgs }: FrameIntervalProps) => {
  return (
    <div className="flex items-center gap-2 w-fit ml-auto">
      <label htmlFor="frameInterval">Frame Interval:</label>
      <input
        id="frameInterval"
        type="number"
        min="1"
        max={svgs.length}
        value={frameInterval}
        onChange={(e) => setFrameInterval(Math.max(1, parseInt(e.target.value) || 1))}
        className="flex items-center gap-2 w-fit ml-auto bg-black text-white rounded p-1 outline-none border-none"
      />
    </div>
  )
}
