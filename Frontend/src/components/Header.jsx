import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext, useState } from "react";
import { LoggedInUserContext } from "../contexts/LoggedInUserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faArrowAltCircleRight,
} from "@fortawesome/free-regular-svg-icons";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { logOut, loggedInUser } = useContext(LoggedInUserContext);

  const [extended, setExtended] = useState(false);

  const handleExtend = () => {
    setExtended(!extended);
  };
  
  return (
    <NavBar>
      <Link className="logo" to="/">
        Cookterest
      </Link>
      <NavLinksBig>
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
      </NavLinksBig>
      <NavLinksSmall>
        <button type="button" onClick={handleExtend}>
          {extended ? (
            <FontAwesomeIcon icon={faX} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </button>
        {extended ? (
          <ExtendedLinks>
            {loggedInUser ? (
              <>
                <Link to="/recipe/create" onClick={handleExtend}>
                  Add a recipe
                </Link>
                <Link
                  to={`/profile/${loggedInUser._id}`}
                  onClick={handleExtend}
                >
                  Profile
                </Link>
                <Link
                  to="/"
                  onClick={() => {
                    handleExtend();
                    logOut();
                  }}
                >
                  Log out <FontAwesomeIcon icon={faArrowAltCircleRight} />
                </Link>
              </>
            ) : (
              <Link to="/login" onClick={handleExtend}>
                <FontAwesomeIcon icon={faUser} />
                {"  "}
                Sign in
              </Link>
            )}
          </ExtendedLinks>
        ) : null}
      </NavLinksSmall>
    </NavBar>
  );
};

export default Header;

const NavBar = styled.nav`
  height: 60px;
  display: flex;
  justify-content: space-between;

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

const NavLinksBig = styled.div`
  display: flex;
  align-items: center;
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

  @media (max-width: 570px) {
    display: none;
  }
`;

const NavLinksSmall = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 570px) {
    display: none;
  }

  button {
    position: absolute;
    right: 1rem;
    top: 0.4rem;
    padding: 0.5rem 1rem;
  }
`;

const ExtendedLinks = styled.div`
  position: absolute;
  min-width: 100vw;
  top: 60px;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 2rem 1.5rem;

  a {
    text-decoration: none;
    margin: 5px 20px;
    transition: 0.4s;
  }

  a:hover {
    transform: scale(1.1);
  }
`;
