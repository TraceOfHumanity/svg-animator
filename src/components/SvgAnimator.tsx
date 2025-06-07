import { FramesList } from "./Animation/FramesList/FramesList";
import { SvgAnimatorFileInput } from "./SvgAnimatorFileInput";
import { Title } from "./SvgAnimatorTitle";

export const SvgAnimator = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container mx-auto h-screen max-h-screen px-4 py-8 md:px-8 md:py-16 flex flex-col gap-4 overflow-y-auto">
      {children}
    </div>
  );
};

SvgAnimator.Title = Title;
SvgAnimator.FileInput = SvgAnimatorFileInput;
SvgAnimator.FramesList = FramesList;
