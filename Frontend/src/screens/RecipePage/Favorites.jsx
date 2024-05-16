import { useEffect, useState } from "react";
import styled from "styled-components";
import useFetchFavorites from "../../hooks/useFetchFavorites";

const Favorites = ({ recipe, userId }) => {
  //    Get the recipe Ids in the favorites array of the logged in user
  const { favorites } = useFetchFavorites(userId);

  //    True if the recipe Id is in the favorites array of the logged in user
  //    False if the recipe Id is not in the favorites array of the logged in user
  const [isFavorite, setIsFavorites] = useState(null);
  const [saving, setSaving] = useState(false);

  const recipeId = recipe._id;
  const recipeName = recipe.title;

  //    Use effect to set the initial state of isFavorite
  useEffect(() => {
    favorites && setIsFavorites(favorites.includes(recipeId));
  }, []);

  const addFavorite = async () => {
    setSaving(true);
    try {
      await fetch(`/api/users/favorites/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId, recipeName }),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsFavorites(!isFavorite);
      setSaving(false);
    }
  };

  const handleOnClick = async (event) => {
    event.preventDefault();
    addFavorite();
  };

  return (
    <SaveBtn
      type="button"
      disabled={saving ? true : false}
      onClick={handleOnClick}
    >
      {isFavorite ? "Saved" : "Save"}
    </SaveBtn>
  );
};

export default Favorites;

const SaveBtn = styled.button`
  padding: 0.5rem;
  border-radius: 10px;
`;
