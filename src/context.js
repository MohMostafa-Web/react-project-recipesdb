import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const url = "https://forkify-api.herokuapp.com/api/search?q=";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [recipes, setRecipes] = useState([]);


  useEffect(() => {
    const fetchRecipes = () => {
      setLoading(true);
      /* using axios().get().then().catch() to fetch data */
      axios
        .get(`${url}${searchTerm !== "" ? searchTerm : "pizza"}`) // set default value "pizza" for state "searchTerm"
        .then((response) => {
          // console.log(response.data); // debug, data = {counts: number, recipes: [...]}
          const data = response.data;
          /* Destructuring receipes only from data */
          const { recipes } = data;
          // console.log(recipes); // debug
          if (recipes) {
            /* Loop over "recipes" Array to destructure every item with simple properties name */
            const newRecipes = recipes.map(item => {
              const { recipe_id, title, image_url, publisher } = item;
              return {
                id: recipe_id,
                name: title,
                image: image_url,
                info: publisher,
              };
            });
            setRecipes(newRecipes); // update "recipes" state with new recipes
          } else {
            setRecipes([]);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
          setRecipes([]);
          setLoading(false);
        });
    };

    fetchRecipes();
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{ loading, setSearchTerm, recipes }}
    >
      {children}
    </AppContext.Provider>
  );
};

/* Create custome hook "useGlobalContext" using "useContext()" */
export const useGlobalContext = () => {
  return useContext(AppContext);
};
