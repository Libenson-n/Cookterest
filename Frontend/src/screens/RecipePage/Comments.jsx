import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { LoggedInUserContext } from "../../contexts/LoggedInUserContext";
import StarRating from "./StarRating";

const Comments = ({ recipe, comments }) => {
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();

  const { loggedInUser } = useContext(LoggedInUserContext);

  const userName = loggedInUser?.name;
  const userId = loggedInUser?._id;
  const recipeName = recipe.title;
  const recipeId = recipe._id;
  const timestamp = new Date().toLocaleString();

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

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
      setComment("");
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    mutateAsync();
  };

  return (
    <section>
      <ReviewForm onSubmit={onSubmit}>
        <div> </div>
        <label htmlFor="feedback-user-review">
          {loggedInUser ? (
            <div>
              <h2>Rate this recipe.</h2>
              <StarRating recipeId={recipeId} />
            </div>
          ) : (
            <h2>Sign in to leave a comment.</h2>
          )}
        </label>
        <TextInput
          id="feedback-user-review"
          rows={4}
          value={comment}
          disabled={loggedInUser ? false : true}
          placeholder={loggedInUser ? "What did you think of this recipe?" : ""}
          onChange={handleCommentInput}
        ></TextInput>
        {loggedInUser ? (
          <button type="submit" disabled={isPending ? true : false}>
            {isPending ? "Submitting" : "Submit"}
          </button>
        ) : null}
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
        {comments &&
          comments?.map((comment, index) => (
            <Comment key={index}>
              <User>
                <h3>{comment.userName}</h3>
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
  min-width: 80vw;
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
  min-width: 100%;
`;

const CommentsSection = styled.section`
  margin-block: 50px;
  margin-inline: 10px;

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
