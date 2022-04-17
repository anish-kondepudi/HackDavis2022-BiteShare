import React from 'react';
import './styles/Tile.css';

const Tile = ({food}) => {

  return (
    <div className="post_wrapper" key={indFood.id}>
        <div class="header_wrapper">
        <img src={indFood.imgData} className="header_img" />
        </div>
        <div className="content_text">
        <p className="title">{indFood.name}</p>
        <p className="txt">{indFood.desc}</p>
        <div className="line_separator" ></div>
        <div className="tile_footer">
            <div className="date">From: {indFood.email}</div>
            <a href="#" onClick={() => {cardClicked(indFood)}} className="pull-right readmore">Pick Up</a>
        </div>
        </div>
    </div>
  );
}

export default Tile;
