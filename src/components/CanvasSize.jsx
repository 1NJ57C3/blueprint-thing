import { useCanvasContext } from "../contexts/canvasContext";

function CanvasSize() {
  const { flameLevel, setFlameLevel } = useCanvasContext();
  const basicDimensions = { length: 40, width: 40, height: 40 };

  return (
    <>
      <p>Length: {basicDimensions.length * flameLevel}</p>
      <p>Width: {basicDimensions.width * flameLevel}</p>
      <p>Height: {basicDimensions.height * flameLevel}</p>
      <label htmlFor="flame-level">Flame Level: &nbsp;</label>
      <select
        id="flame-level"
        name="flame-level"
        value={flameLevel}
        onChange={(e) => setFlameLevel(e.target.value)}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </>
  )
}

export default CanvasSize;
