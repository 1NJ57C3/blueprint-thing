import { useEffect, useState } from "react";
import { useCanvasContext } from "../hooks/useCanvasContext";
import Grid from "./Grid";

function Canvas() {
  const { flameLevel, blockTool } = useCanvasContext();
  const [canvas, setCanvas] = useState([]);

  function handleHoverGrid(x, y, z, { hover }) {
    setCanvas((prevCanvas) => {
      const newCanvas = [...prevCanvas];
      const maxX = Math.min(x + blockTool.size, newCanvas[y].length);
      const maxY = Math.min(y + blockTool.size, newCanvas.length);

      if (blockTool.direction === "x") {
        for (let i = x; i < maxX; i++) {
          newCanvas[y][i].isHovered = hover;
        }
      } else if (blockTool.direction === "y") {
        for (let i = y; i < maxY; i++) {
          newCanvas[i][x].isHovered = hover;
        }
      }
      return newCanvas;
    });
  }

  function handleClickGrid(x, y, z, { fill }) {
    setCanvas((prevCanvas) => {
      const newCanvas = [...prevCanvas];
      const fillStart = newCanvas[y][x];
      const fillEndX = x + blockTool.size - 1;
      const fillEndY = y + blockTool.size - 1;
      const canvasWidth = newCanvas[y].length;
      const canvasLength = newCanvas.length;
      let conflict = false;

      if (blockTool.direction === "x" && fillEndX < canvasWidth) {
        for (let i = x; i <= fillEndX; i++) {
          if (newCanvas[y][i].isOccupied) conflict = true;
        }
        if (
          newCanvas[y][x].isSnapPoint &&
          !newCanvas[y][x - 1].isOccupied &&
          !newCanvas[y][x + 1].isOccupied
        )
          conflict = false;
        if (!conflict) {
          for (let i = x; i <= fillEndX; i++) {
            newCanvas[y][i].isOccupied = fill;
          }
          fillStart.isSnapPoint = fill;
          newCanvas[y][fillEndX].isSnapPoint = fill;
        }
      } else if (blockTool.direction === "y" && fillEndY < canvasLength) {
        for (let i = y; i <= fillEndY; i++) {
          if (newCanvas[i][x].isOccupied) conflict = true;
        }
        if (
          newCanvas[y][x].isSnapPoint &&
          !newCanvas[y - 1][x].isOccupied &&
          !newCanvas[y + 1][x].isOccupied
        )
          conflict = false;
        if (!conflict) {
          for (let i = y; i <= fillEndY; i++) {
            newCanvas[i][x].isOccupied = fill;
          }
          fillStart.isSnapPoint = fill;
          newCanvas[fillEndY][x].isSnapPoint = fill;
        }
      }
      return newCanvas;
    });
  }

  useEffect(() => {
    (function drawCanvas() {
      const z = 0;
      const newCanvas = [];

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
          handleClick={handleClickGrid}
        />
      ))}
    </div>
  ));

  return <div id="canvas">{renderCanvas}</div>;
}

export default Canvas;
