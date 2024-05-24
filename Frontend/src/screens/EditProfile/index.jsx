import { useContext, useEffect, useState } from "react";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useFetchUser from "../../hooks/useFetchUser";

const EditProfile = () => {
  const { loggedInUser, logOut } = useContext(LoggedInUserContext);

  const { user, isPending } = useFetchUser(loggedInUser?._id);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [del, setDel] = useState();

  const navigate = useNavigate();

  const _id = loggedInUser._id;

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setBio(user?.bio);
    setProfilePic(user?.profilePic);
  }, []);

  const handleDelete = async (req, res) => {
    const response = await fetch(`/api/users/profile/${_id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.status === 200) {
      logOut();
      navigate("/");
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      fetch(`/api/users/profile/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          profilePic,
          bio,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            navigate(`/profile/${_id}`);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  if (!loggedInUser) return null;

  return (
    <ProfileMain>
      <h1>Edit Profile</h1>
      <EditForm onSubmit={handleOnSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <label htmlFor="profilePic">Profile picture:</label>
        <input
          type="text"
          name="profilePic"
          placeholder="Enter Image Url"
          value={profilePic}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <label htmlFor="bio">Bio:</label>
        <textarea
          type="text"
          name="bio"
          rows={6}
          cols={30}
          placeholder="Enter bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          required
        />
        <button type="submit">Update</button>
      </EditForm>
      <DeleteBtn>
        <button className="delete" onClick={() => setDel(true)}>
          Delete account
        </button>
        {del ? (
          <ConfirmWrapper>
            <ConfirmDelete>
              <p>Are you sure you want to delete your account?</p>
              <div>
                <button className="confirm" onClick={() => setDel(false)}>
                  Cancel
                </button>
                <button className="confirm delete" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </ConfirmDelete>
          </ConfirmWrapper>
        ) : null}
      </DeleteBtn>
    </ProfileMain>
  );
};

export default EditProfile;

const ProfileMain = styled.main`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DeleteBtn = styled.div`
  .delete {
    background-color: red;
  }
`;

const EditForm = styled.form`
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  margin: 2rem;
  border: solid 1px gray;
  border-radius: 10px;
  padding: 1rem;

  input,
  textarea {
    font-size: 1.1rem;
    padding: 0.3rem;
    width: 30ch;
    border-radius: 8px;
    border: solid 1px rgba(0, 0, 0, 0.3);
    resize: none;
  }
  label {
    text-align: left;
  }

  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: var(--button-color);
    cursor: pointer;
    transition: border-color 0.25s;
  }
  button:hover {
    border-color: #646cff;
  }
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;
const ConfirmWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  min-height: 100vh;
  min-width: 100vw;
  background-color: rgba(0, 0, 0, 0.9);
`;

const ConfirmDelete = styled.div`
  display: flex;
  margin-inline: auto;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: solid 2px black;
  border-radius: 8px;
  padding: 2rem;
  background-color: white;

  .confirm {
    margin: 1rem;
  }
`;
