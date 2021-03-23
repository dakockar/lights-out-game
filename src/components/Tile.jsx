import React from 'react'
import "./Tile.css"


function Tile(props) {

  function handleClick() {
    // call the board to handle toggle adjacent tiles
    props.toggleTiles();
  }

  let classes = "Tile" + (props.isLit ? " Tile-lit" : "");

  return (
    <div className={classes} onClick={handleClick} />
  )
}


export default Tile;