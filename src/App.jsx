import './App.css'
import Canvas from './components/Canvas';
import CanvasSize from './components/CanvasSize';
import ToolSelector from './components/ToolSelector';
import { CanvasProvider } from './contexts/canvasContext';

function App() {

  return (
    <>
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
    </>
  )
}

export default App
