import { useContext, useEffect, useState } from "react";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import useFetchUserProfile from "../../hooks/useFetchUserProfile";
import FavoriteSection from "./FavoriteSection";
import CreatedRecipes from "./CreatedRecipes";

const ProfilePage = () => {
  const { _id } = useParams();

  const { loggedInUser } = useContext(LoggedInUserContext);

  const [isOwner, setIsOwner] = useState(null);

  const { user, isPending } = useFetchUserProfile(_id);

  const [expandSaved, setExpandSaved] = useState(false);
  const [expandCreated, setExpandCreated] = useState(true);

  const handleExpand = (event) => {
    if (event.target.name === "saved") {
      setExpandSaved(true);
      setExpandCreated(false);
    } else if (event.target.name === "created") {
      setExpandSaved(false);
      setExpandCreated(true);
    }
  };

  useEffect(() => {
    loggedInUser && setIsOwner(loggedInUser._id === _id);
  }, []);

  if (isPending) return <h1>Loading...</h1>;

  return (
    <ProfileMain>
      <Name>
        <h1>{user?.name}</h1>
        {isOwner && (
          <Link className="edit" to={`/profile/edit/${loggedInUser._id}`}>
            Edit profile
          </Link>
        )}
      </Name>
      <img src={user?.profilePic} alt={user?.name} />
      <Accordion>
        <SubSection>
          <AccordionBtn
            type="button"
            name="saved"
            onClick={(event) => handleExpand(event)}
          >
            Saved Recipes
          </AccordionBtn>
          <AccordionBtn
            type="button"
            name="created"
            onClick={(event) => handleExpand(event)}
          >
            Your Recipes
          </AccordionBtn>
        </SubSection>
        {expandSaved ? (
          <FavoriteSection loggedInUser={loggedInUser} _id={_id} />
        ) : null}
        {expandCreated ? <CreatedRecipes _id={_id} /> : null}
      </Accordion>
    </ProfileMain>
  );
};

export default ProfilePage;

const ProfileMain = styled.main`
  height: 100vh;
  margin-inline: 20vw;
  display: flex;
  flex-direction: column;

  h1 {
  }

  img {
    width: 100px;
    border-radius: 100px;
  }
  ul {
    list-style-type: none;
    img {
      width: 60px;
      height: 60px;
      border-radius: 0;
    }
  }

  .edit {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.4rem;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: var(--button-color);
    cursor: pointer;
    transition: border-color 0.25s;
    text-decoration: none;
    width: fit-content;
  }
  &:hover {
    border-color: #646cff;
  }
  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

const Name = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-block: 1rem;
`;

const SubSection = styled.div`
  display: flex;
  gap: 2rem;
  padding-bottom: 1rem;
  border-bottom: solid 1px var(--primary-border);
  margin-bottom: 1rem;
`;

const Accordion = styled.section`
  border: solid 1px var(--primary-border);
  padding: 1rem;
  border-radius: 8px;
  margin-top: 2rem;
`;
const AccordionBtn = styled.button`
  background-color: inherit;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
`;
