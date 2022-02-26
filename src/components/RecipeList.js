import React from "react";
import Recipe from "./Recipe";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const RecipeList = () => {
  /* Consume context value using useGlobalContext() */
  const { loading, recipes } = useGlobalContext();

  if (loading) {
    return <Loading />;
  }

  if (recipes.length === 0) {
    return (
      <h2 className="section-title">no recipes matched your search criteria</h2>
    );
  }

  return (
    <section className="section">
      <h2 className="section-title">recipes</h2>
      <div className="recipes-center">
        {recipes.map((item) => (
          <Recipe key={item.id} {...item} />
        ))}
      </div>
    </section>
  );
};

export default RecipeList;
