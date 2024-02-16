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
        return "grid conflict";
      } else {
        return "grid hovered";
      }
    } else if (isOccupied) {
      return "grid occupied";
    } else {
      return "grid blank";
    }
  }

  return (
    <div
      className={classNameHelper()}
      onMouseEnter={() => handleMouseEnter(x, y, z)}
      onMouseLeave={() => handleMouseLeave(x, y, z)}
    >
      {/* {isHovered ? "2" : isOccupied ? "1" : "0"} */}
    </div>
  );
}

export default Grid;
