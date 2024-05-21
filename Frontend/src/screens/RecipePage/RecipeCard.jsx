import styled from "styled-components";
import { Link } from "react-router-dom";
import Favorites from "../../components/Favorites";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import { useContext } from "react";

const RecipeCard = ({ recipe }) => {
  if (!recipe) return <p>Loading...</p>;

  const { loggedInUser } = useContext(LoggedInUserContext);

  return (
    <Container>
      <Image>
        <img src={recipe.imageURL} />
      </Image>
      <Title>
        <Link to={`/recipe/${recipe._id}`} className="recipeName">
          {recipe.title}
        </Link>
        {loggedInUser ? (
          <Favorites recipe={recipe} userId={loggedInUser._id} />
        ) : null}
      </Title>
      <Tags>
        {recipe.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Tags>
    </Container>
  );
};

export default RecipeCard;

const Container = styled.div`
  height: 400px;
  min-width: 260px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 1rem;
  border-radius: 8px;
  /* background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 230, 154, 0.5) 100%
  ); */
  border: solid 1px var(--primary-border);

  a {
    color: inherit;
    text-decoration: none;
  }
  a:visited {
    color: inherit;
  }
`;

const Image = styled.div`
  height: 60%;

  img {
    width: 100%;
    height: 100%;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-inline: 0.5rem;

  .recipeName {
    font-size: 1.2rem;
    font-weight: 400;
  }
`;

const Tags = styled.ul`
  display: flex;
  gap: 0.6rem;
  list-style-type: none;
  font-size: 0.7rem;
  font-weight: bold;
  margin-left: 0.6rem;
`;

const Tag = styled.li`
  background-color: var(--button-color);
  padding: 0.2rem;
  border-radius: 8px;
`;
