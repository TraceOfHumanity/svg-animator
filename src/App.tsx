import { MainContainer } from "./components/MainContainer";
import { Title } from "./components/Title";
import { useState } from "react";

function App() {
  const [svgs, setSvgs] = useState<string[]>([]);

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

  return (
    <MainContainer>
      <Title />
      <input type="file" accept="image/svg+xml" multiple onChange={handleSvgUpload} />
      <div>
        {svgs.map((svg, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: svg }} />
        ))}
      </div>
    </MainContainer>
  );
}

export default App;
