import { useEffect, useState } from "react";
import { useCanvasContext } from "../contexts/canvasContext";
import Grid from "./Grid";

function Canvas() {
  const { flameLevel, blockTool } = useCanvasContext();
  const [canvas, setCanvas] = useState([]);
  
  function handleMouseEnter(x, y, z) {
    setCanvas(prevCanvas => {
      let newCanvas = [...prevCanvas];
      if (blockTool.direction === "x") {
        for (let i = 0; i < blockTool.size; i++) {
          if (x + i < newCanvas[y].length) {
            newCanvas[y][x + i].isHovered = true;
          }
        }
      } else if (blockTool.direction === "y") {
        for (let i = 0; i < blockTool.size; i++) {
          if (y + i < newCanvas.length) {
            newCanvas[y + i][x].isHovered = true;
          }
        }
      }
        
      return newCanvas;
    });
  }

  function handleMouseLeave(x, y, z) {
    setCanvas(prevCanvas => {
      let newCanvas = [...prevCanvas];
      if (blockTool.direction === "x") {
        for (let i = 0; i < blockTool.size; i++) {
          if (x + i < newCanvas[y].length) {
            newCanvas[y][x + i].isHovered = false;
          }  
        }
      } else if (blockTool.direction === "y") {
        for (let i = 0; i < blockTool.size; i++) {
          if (y + i < newCanvas.length) {
            newCanvas[y + i][x].isHovered = false;
          }
        }
      }
      return newCanvas;
    });
  }

  useEffect(() => {
    (function drawCanvas() {
      const z = 0;
      let newCanvas = [];
  
      for (let y = 0; y < flameLevel * 40; y++) {
        let row = [];
  
        for (let x = 0; x < flameLevel * 40; x++) {
          row.push({
            x: x,
            y: y,
            z: z,
            isOccupied: false,
            isSnapPoint: false,
            isHovered: false,
          });
        }
        newCanvas.push(row);
      }
      setCanvas(newCanvas);
    })()
  }, [flameLevel]);

  const renderCanvas = canvas.map((row, i) => (
    <div key={"row" + i} className="canvas-row">
      {row.map(({ x, y, z, isOccupied, isSnapPoint, isHovered }) => (
        <Grid
          key={"x" + x + "y" + y + "z" + z}
          x={x}
          y={y}
          z={z}
          isOccupied={isOccupied}
          isSnapPoint={isSnapPoint}
          isHovered={isHovered}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      ))}
    </div>
  ));

  return (
    <div id="canvas">{renderCanvas}</div>
  );
}

export default Canvas;
