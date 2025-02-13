import { MainContainer } from "./components/MainContainer";
import { Title } from "./components/Title";
import { useState } from "react";
import { saveAs } from "file-saver";

function App() {
  const [svgs, setSvgs] = useState<string[]>([]);
  const [animationDuration, setAnimationDuration] = useState("2s");

  const handleSvgUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newSvgs: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          newSvgs.push(e.target?.result as string);
          if (newSvgs.length === files.length) {
            setSvgs((prevSvgs) => [...prevSvgs, ...newSvgs]);
          }
        };
        reader.readAsText(file);
      });
    }
  };

  const generateAnimation = () => {
    const totalFrames = svgs.length;
    return svgs.map((svg, index) => {
      const startTime = (index / totalFrames).toFixed(3);
      const endTime = ((index + 1) / totalFrames).toFixed(3);
      return `
        <g id="group${index + 1}" opacity="0">${svg}</g>
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

  return (
    <MainContainer>
      <Title />
      <input type="file" accept="image/svg+xml" multiple onChange={handleSvgUpload} />
      <input
        type="text"
        value={animationDuration}
        onChange={(e) => setAnimationDuration(e.target.value)}
        placeholder="Enter animation duration (e.g., 2s)"
      />
      <button onClick={downloadSVG}>Download SVG</button>
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <g dangerouslySetInnerHTML={{ __html: generateAnimation() }} />
      </svg>
    </MainContainer>
  );
}

export default App;
