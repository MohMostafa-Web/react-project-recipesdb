import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const url = "https://forkify-api.herokuapp.com/api/get?rId=";

const SingleRecipe = () => {
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);

  /* Destructure keyname "id" from URL Params using "useParams()" */
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    /* using axios().get().then().catch() to fetch data */
    axios
      .get(`${url}${id}`) // Add URL Param keyname "id" to url
      .then((response) => {
        console.log(response.data); // debug, {recipe: {...}}
        /* Destructuring recipe only from data */
        const { recipe } = response.data;
        /* Destructuring properties names of recipe with simple names */
        const {
          title: name,
          image_url: image,
          social_rank: rank,
          publisher: info,
          ingredients,
        } = recipe;

        /* Create new object "newRecipe" contains new simple properties names */
        const newRecipe = { name, image, rank, info, ingredients };

        setItem(newRecipe); // Update state "item" with a new recipe
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error); // debug
        setItem(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!item) { // Check if item is null
    return <h2 className="section-title">no recipe to display</h2>;
  }

  /* Destructuring item */
  const { name, image, info, ingredients } = item;

  return (
    <section className="section recipe-section">
      <Link to="/" className="btn-primary">
        back home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="food">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="food-data">name :</span> {name}
          </p>
          <p>
            <span className="food-data">publisher :</span> {info}
          </p>
          <p>
            <span className="food-data">ingredients :</span>
            {ingredients.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleRecipe;
