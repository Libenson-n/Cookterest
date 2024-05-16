import styled from "styled-components";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  if (!recipe) return <p>Loading...</p>;

  return (
    <Container>
      <Image>
        <img src={recipe.imageURL} />
      </Image>
      <Title>
        <Link to={`/recipe/${recipe._id}`} className="recipeName">
          {recipe.title}
        </Link>
        <Tags>
          {recipe.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Tags>
      </Title>
    </Container>
  );
};

export default RecipeCard;

const Container = styled.div`
  height: 400px;
  width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 1rem;
  border-radius: 8px;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 230, 154, 0.5) 100%
  );
  border: solid 1px var(--primary-border);

  a {
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
  flex-direction: column;
  align-items: start;
  gap: 0.8rem;
  margin-left: 0.6rem;

  .recipeName {
    font-size: 1.2rem;
    font-weight: 400;
  }
`;

const Tags = styled.ul`
  display: flex;
  gap: 1rem;
  list-style-type: none;
  font-size: 0.7rem;
  font-weight: bold;
`;

const Tag = styled.li`
  background-color: var(--button-color);
  padding: 0.3rem;
  border-radius: 8px;
`;
