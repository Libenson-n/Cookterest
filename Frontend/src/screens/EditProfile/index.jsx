import { useContext, useState } from "react";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EditProfile = () => {
  const { loggedInUser, logOut } = useContext(LoggedInUserContext);
  const [del, setDel] = useState();
  const [name, setName] = useState("");
  console.log(name);
  const navigate = useNavigate();

  const handleDelete = async (req, res) => {
    const _id = loggedInUser._id;
    const response = await fetch(`/api/users/profile/${_id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.status === 200) {
      logOut();
      navigate("/");
    }
  };

  const handleOnChange = (event) => {
    setName(event.target.value);
  };

  if (!loggedInUser) return null;

  return (
    <main>
      <div>EditProfile</div>
      <button onClick={() => setDel(true)}>Delete profile</button>
      {del ? (
        <DeleteConfirmation>
          <p>Are you sure you want to delete this account?</p>
          <button onClick={() => setDel(false)}>Cancel</button>
          <button onClick={handleDelete}>Delete</button>
        </DeleteConfirmation>
      ) : null}
    </main>
  );
};

export default EditProfile;

const DeleteConfirmation = styled.div``;
