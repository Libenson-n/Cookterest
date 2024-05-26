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
    if (event.target.name === "ingredients") {
      recipe.ingredients.splice(index, 1);
      setRecipe({ ...recipe })
    } else if (event.target.name === "instructions") {
      recipe.instructions.splice(index, 1);
      setRecipe({ ...recipe });
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
      console.log(data);
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
    addRecipe();
  };

  return (
    <CreateRecipeMain>
      <>
        {authorized ? (
          <RecipeForm onSubmit={onSubmit}>
            <label htmlFor="title">Name of your recipe</label>
            <FormInput
              id="title"
              name="title"
              onChange={(event) => handleInput(event)}
            />
            <label htmlFor="subtitle">Description</label>
            <FormInput
              id="subtitle"
              name="subtitle"
              onChange={(event) => handleInput(event)}
            />
            <label htmlFor="ingredients">Ingredients</label>
            {recipe.ingredients.map((ingredient, index) => (
              <IngredientInput key={`ingredient-${index}`}>
                <FormInput
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
                <FormInput
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
            <FormInput
              id="image"
              name="imageURL"
              onChange={(event) => handleInput(event)}
            />
            <label htmlFor="tags">Tags</label>
            <TagGrid>
              {tags.map((tag) => (
                <Tags key={tag}>
                  <label>{tag}</label>
                  <input
                    type="checkbox"
                    value={tag}
                    onChange={(event) => handleCheckbox(event)}
                  />
                </Tags>
              ))}
            </TagGrid>
            <button type="submit" className="submit">
              Submit
            </button>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RecipeForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 0.3rem;
  margin-top: 60px;

  .submit {
    margin: 2rem auto;
  }
`;

const FormInput = styled.input`
  font-size: 1.1rem;
  padding: 0.3rem;
  width: 30ch;
  border-radius: 8px;
  border: solid 1px rgba(0, 0, 0, 0.3);
`;

const TagGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 630px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Tags = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  border: solid 0.5px rgba(0, 0, 0, 0.1);
  padding-inline: 0.5rem;

  @media (max-width: 630px) {
    font-size: 0.8rem;
  }
`;

const IngredientInput = styled.div`
  display: flex;
  gap: 5px;
`;

const InstructionInput = styled.div`
  display: flex;
  gap: 5px;
`;
