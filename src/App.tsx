import {SvgAnimator} from './components/SvgAnimator';

function App() {
  return (
    <SvgAnimator>
      <SvgAnimator.Title />
      <SvgAnimator.FileInput />
      <SvgAnimator.Animation />
      <SvgAnimator.DownloadSvgButton />
    </SvgAnimator>
  );
}

export default App;
