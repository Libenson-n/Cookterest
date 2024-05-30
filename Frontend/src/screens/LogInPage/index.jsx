import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

  const { logIn } = useContext(LoggedInUserContext);

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setFetching(true);
      const response = await fetch("/api/users/auth", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      setFetching(false);
      const data = await response.json();
      if (data.status === 200) {
        logIn(data.user);
        setSuccess(true);
        navigate("/");
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInput = (event) => {
    const field = event.target.name;
    if (field === "email") {
      setEmail(event.target.value);
      setError(false);
    } else if (field === "password") {
      setPassword(event.target.value);
      setError(false);
    }
  };

  return (
    <LogInMain>
      <LogInForm onSubmit={onSubmit}>
        <h2>Sign In</h2>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email"
          onChange={(event) => handleInput(event)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          onChange={(event) => handleInput(event)}
          required
        />
        {error === true && <p>email or password is not valid</p>}
        <button type="submit">Sign In</button>
        <div>
          <p>
            New to Cookterest? <Link to="/register">Sign up!</Link>
          </p>
        </div>
      </LogInForm>
    </LogInMain>
  );
};

export default LogInPage;

const LogInMain = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogInForm = styled.form`
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  margin: 100px auto;
  border: solid 1px gray;
  border-radius: 10px;
  padding: 2rem;

  input {
    font-size: 1.1rem;
    padding: 0.3rem;
    width: 30ch;
    border-radius: 8px;
    border: solid 1px rgba(0, 0, 0, 0.3);
  }
  label {
    text-align: left;
  }

  a {
    text-decoration: none;
  }
`;
