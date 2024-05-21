import { useEffect, useState } from "react";
import styled from "styled-components";
import useFetchFavorites from "../hooks/useFetchFavorites";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Favorites = ({ recipe, userId }) => {
  //    Get the recipe Ids in the favorites array of the logged in user
  const { favorites, isPending } = useFetchFavorites(userId);

  //    True if the recipe Id is in the favorites array of the logged in user
  //    False if the recipe Id is not in the favorites array of the logged in user
  const [isFavorite, setIsFavorites] = useState(null);
  const [saving, setSaving] = useState(false);

  const recipeId = recipe._id;
  const recipeName = recipe.title;

  //    Use effect to set the initial state of isFavorite
  useEffect(() => {
    !isPending && setIsFavorites(favorites.includes(recipeId));
  }, [isPending, recipeId]);

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

  let btnColor = isFavorite ? "red" : "grey";

  return (
    <>
      {favorites ? (
        <BtnWrapper>
          <SaveBtn
            type="button"
            disabled={saving ? true : false}
            onClick={handleOnClick}
            style={{ color: `${btnColor}` }}
          >
            <p>{isFavorite ? "Saved" : "Save"}</p>
            <FontAwesomeIcon icon={faHeart} />
          </SaveBtn>
        </BtnWrapper>
      ) : null}
    </>
  );
};

export default Favorites;

const BtnWrapper = styled.div`
  border: solid 1px var(--primary-border);
  padding: 0.5rem;
  border-radius: 8px;
  width: fit-content;
`;

const SaveBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  border: none;
  color: red;
  background-color: inherit;
  font-size: 1.3rem;
  padding: 0;

  &:hover {
    cursor: pointer;
  }
  p {
    color: dimgray;
    font-size: 1rem;
  }
`;
