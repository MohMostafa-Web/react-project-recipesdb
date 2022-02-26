import React from "react";
import { Link } from "react-router-dom";

const Recipe = ({ id, name, image, info }) => {
  return (
    <article className="recipe">
      <div className="img-container">
        <img src={image} alt={name} />
      </div>
      <div className="recipe-footer">
        <h5>{name}</h5>
        <p>{info}</p>
        <Link to={`recipe/${id}`} className="btn-primary">details</Link>
      </div>
    </article>
  );
};

export default Recipe;
