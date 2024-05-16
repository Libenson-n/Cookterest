import { createContext, useState } from "react";

export const LoggedInUserContext = createContext();

const LoggedInUserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const logIn = (user) => {
    setLoggedInUser(user);
  };

  const logOut = async () => {
    await fetch("/api/users/logout", {
      method: "POST",
    });
    setLoggedInUser(null);
  };

  return (
    <LoggedInUserContext.Provider value={{ logIn, logOut, loggedInUser }}>
      {children}
    </LoggedInUserContext.Provider>
  );
};

export default LoggedInUserProvider;
