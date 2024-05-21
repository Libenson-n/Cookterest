import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { LoggedInUserContext } from "../contexts/LoggedInUserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faArrowAltCircleRight,
} from "@fortawesome/free-regular-svg-icons";

const Header = () => {
  const { logOut, loggedInUser } = useContext(LoggedInUserContext);

  return (
    <NavBar>
      <Link className="logo" to="/">
      Cookstagram
      </Link>
      <Nav>
        {loggedInUser ? (
          <>
            <Link to="/recipe/create">Add a recipe</Link>
            <Link to={`/profile/${loggedInUser._id}`}>Profile</Link>
            <Link to="/" onClick={logOut}>
              Log out <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </Link>
          </>
        ) : (
          <Link to="/login">
            <FontAwesomeIcon icon={faUser} />
            {"  "}
            Sign in
          </Link>
        )}
      </Nav>
    </NavBar>
  );
};

export default Header;

const NavBar = styled.nav`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  min-width: auto;
  background-color: var(--accent-color);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  font-size: 1.5rem;
  box-shadow: var(--primary-shadow);

  .logo {
    margin-left: 20px;
    text-decoration: none;
    font-family: "Arizonia", cursive;
    font-size: 2.5rem;
    font-weight: 900;
    font-style: normal;
  }
  a:visited {
    color: inherit;
  }
`;

const Nav = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  margin-right: 20px;

  a {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s;
    text-decoration: none;
    color: inherit;
    background-color: var(--button-color);
  }
  a:hover {
    border-color: #646cff;
  }
  a:focus,
  a:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;
