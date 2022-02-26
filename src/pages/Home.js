import React from "react";
import RecipeList from "../components/RecipeList";
import SearchForm from "../components/SearchForm";

const Home = () => {
  return (
    <div>
      <SearchForm />
      <RecipeList />
    </div>
  );
};

export default Home;
