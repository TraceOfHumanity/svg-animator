import { useState } from "react";
import { saveAs } from "file-saver";
import { v4 as uuidv4 } from 'uuid';

export const useAnimationGenerator = () => {
  const [svgs, setSvgs] = useState<{ id: string, name: string, svg: string }[]>([]);
  const [animationDuration, setAnimationDuration] = useState<number>(1.5);
  const [frameInterval, setFrameInterval] = useState<number>(1);

  const sortSvgs = (items: { id: string, name: string, svg: string }[]) => {
    return items.sort((a, b) => {
      const numA = parseInt(a.name.split('.')[0], 10);
      const numB = parseInt(b.name.split('.')[0], 10);
      return numA - numB;
    });
  };

  const handleSvgUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newSvgs: { id: string, name: string, svg: string }[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newSvgs.push({ id: uuidv4(), name: file.name, svg: e.target?.result as string });
          if (newSvgs.length === files.length) {
            setSvgs((prevSvgs) => sortSvgs([...prevSvgs, ...newSvgs]));
          }
        };
        reader.readAsText(file);
      });
    }
  };

  const generateAnimation = () => {
    const filteredSvgs = svgs.filter((_, index) => index % frameInterval === 0);
    const totalFrames = filteredSvgs.length;

    return filteredSvgs.map((svg, index) => {
      const startTime = (index / totalFrames).toFixed(3);
      const endTime = ((index + 1) / totalFrames).toFixed(3);
      return `
        <g id="group${index + 1}" opacity="0">${svg.svg}</g>
        <animate href="#group${index + 1}" attributeName="opacity" values="0;0;1;1;0;0" dur="${animationDuration}" repeatCount="indefinite" keyTimes="0;${startTime};${startTime};${endTime};${endTime};1" fill="freeze"></animate>
      `;
    }).join('');
  };

  const downloadSVG = () => {
    const svgContent = `
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        ${generateAnimation()}
      </svg>
    `;
    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    saveAs(blob, "animated.svg");
  };
  
  return {
    svgs,
    setSvgs,
    animationDuration,
    setAnimationDuration,
    handleSvgUpload,
    downloadSVG,
    frameInterval,
    setFrameInterval,
    generateAnimation,
  }
}
