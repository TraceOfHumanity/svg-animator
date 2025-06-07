import { useContext } from "react";
import { SvgAnimatorContext } from "../context/SvgAnimatorContext";

export const SvgAnimatorDownloadSvgButton = () => {
  const { downloadSVG } = useContext(SvgAnimatorContext);
  return (
    <button
      className="flex items-center gap-2 w-fit ml-auto bg-black text-white rounded p-1"
      onClick={downloadSVG}
    >
      Download SVG
    </button>
  );
};
