import styled from "styled-components";
import { useState, useContext } from "react";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import useFetchComments from "../../hooks/useFetchComments";

const Comments = ({ recipe }) => {
  const [comment, setComment] = useState("");

  const { loggedInUser } = useContext(LoggedInUserContext);

  const userName = loggedInUser?.name;
  const userId = loggedInUser?._id;
  const recipeName = recipe?.title;
  const recipeId = recipe?._id;
  const timestamp = new Date().toLocaleDateString();

  const { comments, isPending } = useFetchComments(recipeId);

  const handleCommentInput = (event) => {
    setComment(event.target.value);
  };

  const addComment = async () => {
    await fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        userId,
        recipeName,
        recipeId,
        comment,
        timestamp,
      }),
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    addComment();
    setComment("");
  };

  return (
    <section>
      <ReviewForm onSubmit={onSubmit}>
        <label htmlFor="feedback-user-review">
          {loggedInUser
            ? "Share your thoughts."
            : "Sign up to leave a comment."}
        </label>
        <TextInput
          id="feedback-user-review"
          cols={65}
          rows={4}
          value={comment}
          disabled={loggedInUser ? false : true}
          placeholder={loggedInUser ? "What did you think of this recipe?" : "" }
          onChange={handleCommentInput}
        ></TextInput>
        {loggedInUser ? <button type="submit">Submit</button> : null}
      </ReviewForm>
      <CommentsSection>
        <h2>Comments</h2>
        {loggedInUser && (
          <>
            {comments?.length === 0 ? (
              <p>Be the first to leave a comment</p>
            ) : null}
          </>
        )}
        {!isPending &&
          comments?.map((comment, index) => (
            <Comment key={index}>
              <User>
                <h3>
                  {comment.userName}
                </h3>
                <p>{comment.timestamp}</p>
              </User>
              <p>{comment.comment}</p>
            </Comment>
          ))}
      </CommentsSection>
    </section>
  );
};

export default Comments;

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 1rem;
  border: solid 2px black;
  border-radius: 8px;
  width: fit-content;
  padding: 20px;

  button { 
    margin-inline: auto;
  }
`;
const TextInput = styled.textarea`
  resize: none;
  border-radius: 8px;
  padding: 10px;
`;

const CommentsSection = styled.section`
  margin-block: 50px;

  h2 {
    border-bottom: inset 2px rgba(0, 0, 0, 0.3);
  }
`;
const Comment = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 6rem;
  margin-block: 10px;
  border-bottom: inset 2px rgba(0, 0, 0, 0.3);

  .username {
    width: fit-content;
    text-decoration: none;
  }
`;

const User = styled.div`
  display: flex;
  justify-content: space-between;

  p {
    font-size: 0.9rem;
  }
`;
