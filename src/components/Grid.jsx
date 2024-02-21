function Grid({
  x,
  y,
  z,
  isOccupied,
  isSnapPoint,
  isHovered,
  handleMouseEnter,
  handleMouseLeave,
}) {
  function classNameHelper() {
    if (isHovered) {
      if (isOccupied) {
        return "conflict";
      } else {
        return "hovered";
      }
    } else if (isOccupied) {
      return "occupied";
    } else {
      return "blank";
    }
  }

  return (
    <div
      className={"grid " + classNameHelper()}
      onMouseEnter={() =>
        handleMouseEnter({ x: x, y: y, z: z, isHovered: true })
      }
      onMouseLeave={() =>
        handleMouseLeave({ x: x, y: y, z: z, isHovered: false })
      }
    />
  );
}

export default Grid;
