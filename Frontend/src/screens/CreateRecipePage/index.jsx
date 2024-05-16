import { useContext, useState } from "react";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import styled from "styled-components";
import tags from "../../utils/tags.js";

const CreateRecipePage = () => {
  const [recipe, setRecipe] = useState({
    title: "",
    subtitle: "",
    tags: [],
    ingredients: [],
    instructions: [],
    imageURL: "",
  });
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);
  const [authorized, setAuthorized] = useState(true);
  const { loggedInUser, logOut } = useContext(LoggedInUserContext);

  const userOwnerId = loggedInUser?._id;

  const handleInput = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };
  const handleIngredientsInput = (event, index) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };
  const handleInstructionsInput = (event, index) => {
    const { value } = event.target;
    const instructions = recipe.instructions;
    instructions[index] = value;
    setRecipe({ ...recipe, instructions });
  };
  const handleCheckbox = (event) => {
    const selectedTag = event.target.value;
    if (recipe.tags.includes(selectedTag)) {
      const index = recipe.tags.indexOf(selectedTag);
      recipe.tags.splice(index, 1);
    } else {
      setRecipe({ ...recipe, tags: [...recipe.tags, selectedTag] });
    }
  };
  const addIngredientsInput = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };
  const removeInput = (event, index) => {
    console.log(event.target.name);
    if (event.target.name === "ingredients") {
      recipe.ingredients.splice(index, 1);
    } else {
      recipe.instructions.splice(index, 1);
    }
  };
  const addInstructions = () => {
    setRecipe({ ...recipe, instructions: [...recipe.instructions, ""] });
  };

  const addRecipe = async () => {
    const { title, subtitle, tags, ingredients, instructions, imageURL } =
      recipe;
    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userOwnerId,
          title,
          subtitle,
          tags,
          ingredients,
          instructions,
          imageURL,
        }),
      });
      const data = await response.json();
      if (data.status !== 200) {
        setAuthorized(false);
        logOut();
      }
      if (response.ok) {
        setSuccess(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(recipe);
    addRecipe();
  };

  return (
    <CreateRecipeMain>
      <>
        {authorized ? (
          <RecipeForm onSubmit={onSubmit}>
            <label htmlFor="title">Name of your recipe</label>
            <input
              id="title"
              name="title"
              onChange={(event) => handleInput(event)}
            />
            <label htmlFor="subtitle">Description</label>
            <input
              id="subtitle"
              name="subtitle"
              onChange={(event) => handleInput(event)}
            />
            <label htmlFor="ingredients">Ingredients</label>
            {recipe.ingredients.map((ingredient, index) => (
              <IngredientInput key={`ingredient-${index}`}>
                <input
                  id="ingredients"
                  name="ingredients"
                  value={ingredient}
                  onChange={(event) => handleIngredientsInput(event, index)}
                />
                <button
                  type="button"
                  name="ingredients"
                  onClick={(event) => removeInput(event, index)}
                >
                  {" "}
                  X{" "}
                </button>
              </IngredientInput>
            ))}
            <button
              type="button"
              onClick={(event) => addIngredientsInput(event)}
            >
              add ingredient
            </button>
            <label htmlFor="instructions">Step-By-Step Instructions</label>

            {recipe.instructions.map((instruction, index) => (
              <InstructionInput key={`instruction-${index}`}>
                <input
                  key={index}
                  id="instructions"
                  name="instructions"
                  placeholder={`Step ${index + 1}`}
                  value={instruction}
                  onChange={(event) => handleInstructionsInput(event, index)}
                />
                <button
                  type="button"
                  name="instructions"
                  onClick={(event) => removeInput(event, index)}
                >
                  {" "}
                  X{" "}
                </button>
              </InstructionInput>
            ))}
            <button type="button" onClick={(event) => addInstructions(event)}>
              add instructions
            </button>
            <label htmlFor="image">Image Url</label>
            <input
              id="image"
              name="imageURL"
              onChange={(event) => handleInput(event)}
            />
            <label htmlFor="tags">Tags</label>
            <TagGrid>
              {tags.map((tag) => (
                <div key={tag}>
                  <label>{tag}</label>
                  <input
                    type="checkbox"
                    value={tag}
                    onChange={(event) => handleCheckbox(event)}
                  />
                </div>
              ))}
              <button type="submit">Submit</button>
            </TagGrid>
          </RecipeForm>
        ) : (
          <h1>Please sign in to add your recipe</h1>
        )}
      </>
    </CreateRecipeMain>
  );
};

export default CreateRecipePage;

const CreateRecipeMain = styled.main`
  height: 100vh;
  width: 100%;
`;

const RecipeForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
`;

const TagGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
`;

const IngredientInput = styled.div`
  display: flex;
  gap: 5px;
`;

const InstructionInput = styled.div`
  display: flex;
  gap: 5px;
`;
