import React, { useState, useEffect } from 'react';
import RecipeList from '../components/RecipeList';
import LoadingIndicator from '../components/LoadingIndicator';
import RecipeSearch from '../components/RecipeSearch';
import './SearchResults.css';

const SearchResults = ({ recipes, isLoading, addToFavorites, onSearch, removeFromFavorites }) => {
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [currentBatch, setCurrentBatch] = useState(0);

  useEffect(() => {
    if (recipes.length > 0) {
      setDisplayedRecipes(recipes.slice(0, 3));
    }
  }, [recipes]);

  const handleNextBatch = () => {
    const nextBatchIndex = currentBatch + 1;
    const startIndex = nextBatchIndex * 3;
    const endIndex = startIndex + 3;

    if (startIndex >= recipes.length) {
      setDisplayedRecipes([]);
    } else {
      setDisplayedRecipes(recipes.slice(startIndex, endIndex));
    }

    setCurrentBatch(nextBatchIndex);
  };

  return (
    <div className="search-results-page">
      <h2>Suggested Recipes</h2>
      <RecipeSearch onSearch={onSearch} />

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <RecipeList
            recipes={displayedRecipes}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
          />
          {displayedRecipes.length > 0 && (
            <button onClick={handleNextBatch} className="next-batch-button">
              I don't like these
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
