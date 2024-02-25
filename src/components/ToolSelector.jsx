import { useCanvasContext } from "../hooks/useCanvasContext";
import RadioButton from "./RadioButton";

function ToolSelector() {
  const { blockTool, setBlockTool } = useCanvasContext();
  const { size, direction } = blockTool;

  function onChangeHandler(e) {
    if (e.target.name === "brush-size") {
      setBlockTool((prevTool) => ({ ...prevTool, size: parseInt(e.target.value) }));
    }
    if (e.target.name === "brush-direction") {
      setBlockTool((prevTool) => ({ ...prevTool, direction: e.target.value }));
    }
  }

  const brushSizes = [
    { value: 1, label: "1 voxel" },
    { value: 4, label: "2 meters" },
    { value: 8, label: "4 meters" },
  ];

  const brushDirections = [
    { value: "x", label: "Horizontal" },
    { value: "y", label: "Vertical" },
  ];

  function renderBrushSelectors(type) {
    const name = "brush-" + type;
    let target = "";
    let validator = "";

    if (type === "size") {
      target = brushSizes;
      validator = size;
    } else if (type === "direction") {
      target = brushDirections;
      validator = direction;
    }

    return target.map((brush, i) => {
      const id = name + "-" + i;
      return (
        <RadioButton
          key={id}
          id={id}
          name={name}
          value={brush.value}
          validator={validator}
          label={brush.label}
          onChangeHandler={onChangeHandler}
        />
      );
    });
  }

  return (
    <div id="ToolSelector">
      <fieldset>
        <legend>Brush Size:</legend>
        <div id="brush-sizes">{renderBrushSelectors("size")}</div>
      </fieldset>
      <fieldset>
        <legend>Brush Direction:</legend>
        <div id="brush-directions">{renderBrushSelectors("direction")}</div>
      </fieldset>
    </div>
  );
}

export default ToolSelector;
