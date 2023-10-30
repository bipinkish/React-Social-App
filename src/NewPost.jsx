import React, { useContext, useRef } from "react";
import DataContext from "./context/DataContext";

const NewPost = () => {
  const { handleSubmit, postTitle, setPostTitle, postBody, setPostBody } =
    useContext(DataContext);
  const inputRef = useRef();
  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          required
          autoComplete="off"
          autoFocus
          ref={inputRef}
          type="text"
          id="postTitle"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label>Body:</label>
        <textarea
          required
          id="postBody"
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit" onClick={() => inputRef.current.focus()}>
          Post
        </button>
      </form>
    </main>
  );
};

export default NewPost;
