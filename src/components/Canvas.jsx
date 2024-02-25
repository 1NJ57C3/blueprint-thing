import { useEffect, useState } from "react";
import { useCanvasContext } from "../hooks/useCanvasContext";
import Grid from "./Grid";

function Canvas() {
  const { flameLevel, blockTool } = useCanvasContext();
  const [canvas, setCanvas] = useState([]);

  function handleHoverGrid({ x, y, z, isHovered }) {
    setCanvas((prevCanvas) => {
      let newCanvas = [...prevCanvas];
      const maxX = Math.min(x + blockTool.size, newCanvas[y].length);
      const maxY = Math.min(y + blockTool.size, newCanvas.length);

      if (blockTool.direction === "x") {
        for (let i = x; i < maxX; i++) {
          newCanvas[y][i].isHovered = isHovered;
        }
      } else if (blockTool.direction === "y") {
        for (let i = y; i < maxY; i++) {
          newCanvas[i][x].isHovered = isHovered;
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
    })();
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
          handleMouseEnter={handleHoverGrid}
          handleMouseLeave={handleHoverGrid}
        />
      ))}
    </div>
  ));

  return <div id="canvas">{renderCanvas}</div>;
}

export default Canvas;
