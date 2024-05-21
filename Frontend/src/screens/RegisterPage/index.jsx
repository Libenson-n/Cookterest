import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (!response.ok) {
        setSuccess(false);
      } else {
        setSuccess(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      {!success ? (
        <RegisterForm onSubmit={onSubmit}>
          <h2>Sign Up</h2>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            onChange={(event) => setName(event.target.value)}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
          <div>
            <p>
              Already have an account? <Link to="/login">Sign in!</Link>
            </p>
          </div>
        </RegisterForm>
      ) : (
        <p>
          Account created successfully, please{" "}
          <Link to={"/login"}>sign in</Link>
        </p>
      )}
    </main>
  );
};

export default RegisterPage;

const RegisterForm = styled.form`
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

  a {
    text-decoration: none;
  }
`;
