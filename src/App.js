import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import RecipeDetails from './pages/RecipeDetails';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || []);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecipes = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      console.log('Fetched recipes:', data.meals);
      setRecipes(data.meals || []);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorites = (recipe) => {
    const isAlreadyFavorite = favorites.some(fav => fav.idMeal === recipe.idMeal);

    if (!isAlreadyFavorite) {
      const updatedFavorites = [...favorites, recipe];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      alert('This recipe is already in your favorites!');
    }
  };


  const removeFromFavorites = (recipe) => {
    const updatedFavorites = favorites.filter((fav) => fav.idMeal !== recipe.idMeal);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };



  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Home favorites={favorites} removeFromFavorites={removeFromFavorites} onSearch={fetchRecipes} />}
          />
          <Route
            path="/search"
            element={<SearchResults recipes={recipes} isLoading={isLoading} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} onSearch={fetchRecipes} favorites={favorites} />}
          />
          <Route
            path="/recipe/:id"
            element={<RecipeDetails addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
