function Grid({
  x,
  y,
  z,
  isOccupied,
  isSnapPoint,
  isHovered,
  hasConflict,
  handleMouseEnter,
  handleMouseLeave,
  handleClick,
}) {
  function classNameHelper() {
    if (isHovered) {
      if (isOccupied) {
        return " conflict";
      } else {
        return " hovered";
      }
    } else if (isOccupied) {
      return " occupied";
    } else if (hasConflict) {
      return " conflict";
    } else {
      return "";
    }
  }

  return (
    <div
      className={"grid" + classNameHelper()}
      onMouseEnter={() => handleMouseEnter(x, y, z, { hover: true })}
      onMouseLeave={() => handleMouseLeave(x, y, z, { hover: false })}
      onClick={() => handleClick(x, y, z, { fill: true })}
      onContextMenu={(e) => {
        e.preventDefault();
        // new handler coming soon™
      }}
    />
  );
}

export default Grid;
