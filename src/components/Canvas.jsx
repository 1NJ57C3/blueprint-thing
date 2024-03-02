import { useEffect, useState } from "react";
import { useCanvasContext } from "../hooks/useCanvasContext";
import Grid from "./Grid";

function Canvas() {
  const { flameLevel, blockTool } = useCanvasContext();
  const [canvas, setCanvas] = useState([]);

  function handleHoverGrid(x, y, z, { hover }) {
    setCanvas((prevCanvas) => {
      const newCanvas = [...prevCanvas];
      const maxX = blockTool.direction === "x" ? Math.min(x + blockTool.size, newCanvas[y].length) : x + 1;
      const maxY = blockTool.direction === "y" ? Math.min(y + blockTool.size, newCanvas.length) : y + 1;
      const brushEndX = blockTool.direction === "x" ? x + blockTool.size : x;
      const brushEndY = blockTool.direction === "y" ? y + blockTool.size : y;
      let conflict = false;

      function checkBrushOutOfBounds() {
        if ((brushEndX > maxX ) || (brushEndY > maxY)) return conflict = true;
      }

      function applyHoverEffect() {
        for (let j = y; j < maxY; j++) {
          for (let i = x; i < maxX; i++) {
            conflict ? newCanvas[j][i].hasConflict = hover : newCanvas[j][i].isHovered = hover;
          }
        }
      }

      checkBrushOutOfBounds();
      applyHoverEffect();

      return newCanvas;
    });
  }

  function handleFillGrid(x, y, z, { fill }) {
    setCanvas((prevCanvas) => {
      const newCanvas = [...prevCanvas];
      const fillStart = newCanvas[y][x];
      const fillEndX = blockTool.direction === "x" ? x + blockTool.size - 1 : x;
      const fillEndY = blockTool.direction === "y" ? y + blockTool.size - 1 : y;
      const canvasWidth = newCanvas[y].length;
      const canvasLength = newCanvas.length;
      let conflict = false;

      if (fillEndX >= canvasWidth || fillEndY >= canvasLength) return newCanvas;
      const fillEnd = newCanvas[fillEndY][fillEndX];

      function checkFillRangeOccupancy() {
        for (let j = y; j <= fillEndY; j++) {
          for (let i = x; i <= fillEndX; i++) {
            if (newCanvas[j][i].isOccupied) return (conflict = true);
          }
        }
      }

      function allowPerpendicularLines() {
        if (
          (blockTool.direction === "x" &&
            !newCanvas[y][x - 1]?.isOccupied &&
            !newCanvas[y][x + 1].isOccupied) ||
          (blockTool.direction === "y" &&
            !newCanvas[y - 1]?.[x].isOccupied &&
            !newCanvas[y + 1][x].isOccupied)
        )
          conflict = false;
      }

      function fillGrids() {
        for (let j = y; j <= fillEndY; j++) {
          for (let i = x; i <= fillEndX; i++) {
            newCanvas[j][i].isOccupied = fill;
          }
        }
        fillStart.isSnapPoint = fill;
        fillEnd.isSnapPoint = fill;
      }

      checkFillRangeOccupancy();
      if (fillStart.isSnapPoint) allowPerpendicularLines();
      if (!conflict) fillGrids();

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
            hasConflict: false,
          });
        }
        newCanvas.push(row);
      }
      setCanvas(newCanvas);
    })();
  }, [flameLevel]);

  const renderCanvas = canvas.map((row, i) => (
    <div key={"row" + i} className="canvas-row">
      {row.map(({ x, y, z, isOccupied, isSnapPoint, isHovered, hasConflict }) => (
        <Grid
          key={"x" + x + "y" + y + "z" + z}
          x={x}
          y={y}
          z={z}
          isOccupied={isOccupied}
          isSnapPoint={isSnapPoint}
          isHovered={isHovered}
          hasConflict={hasConflict}
          handleMouseEnter={handleHoverGrid}
          handleMouseLeave={handleHoverGrid}
          handleClick={handleFillGrid}
        />
      ))}
    </div>
  ));

  return <div id="canvas">{renderCanvas}</div>;
}

export default Canvas;
