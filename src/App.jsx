import './App.css'
import Canvas from './components/Canvas';
import CanvasSize from './components/CanvasSize';
import ToolSelector from './components/ToolSelector';
import { BPProvider } from './contexts/bpContext';
import { CanvasProvider } from './contexts/canvasContext';

function App() {

  return (
    <>
      <BPProvider>
        <h1>
          Blueprint Thingy
        </h1>
        <h3>
          coming soon™
        </h3>
        <CanvasProvider>
          <>
            <CanvasSize />
            <ToolSelector />
          </>
          <Canvas />
        </CanvasProvider>
      </BPProvider>
    </>
  )
}

export default App
