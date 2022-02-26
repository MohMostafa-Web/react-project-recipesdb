import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  /* Consume context value using useGlobalContext() */
  const { setSearchTerm } = useGlobalContext();

  const inputRef = useRef(); // to control input value and focus

  /* using useEffect() to focus on input at initial render */
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  /* Update "searchTerm" state with with input value */
  const searchRecipe = () => {
    setSearchTerm(inputRef.current.value);
  };

  /* prevent default submit of form */
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search your favorite food</label>
          <input
            type="text"
            id="name"
            ref={inputRef}
            onChange={searchRecipe}
            placeholder="e.g. pizza"
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
