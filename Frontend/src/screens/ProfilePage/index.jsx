import { useContext, useEffect, useState } from "react";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import useFetchFavorites from "../../hooks/useFetchFavorites";
import useFecthRecipes from "../../hooks/useFecthRecipes";

const ProfilePage = () => {
  const { _id } = useParams();

  const { loggedInUser } = useContext(LoggedInUserContext);

  const [isOwner, setIsOwner] = useState(null);
  const [savedRecipes, setSavedRecipes] = [];

  const { favorites } = useFetchFavorites(_id);
  const { recipes } = useFecthRecipes();

  useEffect(() => {
    loggedInUser && setIsOwner(loggedInUser._id === _id);
  }, []);

  useEffect(() => {}, []);
  console.log({ favorites: favorites, recipes: recipes });

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetch(`/api/users/${_id}`).then((res) => res.json()),
  });

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <ProfileMain>
      <h1>{data.user.name}</h1>
      {isOwner && (
        <Link to={`/profile/edit/${loggedInUser._id}`}>Edit profile</Link>
      )}
      <img src={data.user.profilePic} alt={data.user.name} />
      <p>{data.user.bio}</p>
      {favorites && <ul></ul>}
    </ProfileMain>
  );
};

export default ProfilePage;

const ProfileMain = styled.main`
  min-height: 100vh;
  margin-inline: 10vw;
  display: flex;
  flex-direction: column;

  h1 {
  }

  img {
    width: 300px;
    border-radius: 8px;
  }
`;
