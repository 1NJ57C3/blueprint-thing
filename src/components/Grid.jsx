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
      onMouseEnter={() => handleMouseEnter(x, y, z)}
      onMouseLeave={() => handleMouseLeave(x, y, z)}
    />
  );
}

export default Grid;
