import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataContext from "./context/DataContext";

const EditPost = () => {
  const { posts, editTitle, editBody, handleEdit, setEditTitle, setEditBody } =
    useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  useEffect(() => {
    setEditTitle(post.title);
    setEditBody(post.body);
  }, [post, setEditTitle, setEditBody]);

  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
        <label>Title:</label>
        <input
          required
          autoComplete="off"
          autoFocus
          type="text"
          id="postTitle"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <label>Body:</label>
        <textarea
          required
          id="postBody"
          value={editBody}
          onChange={(e) => setEditBody(e.target.value)}
        />
        <button type="submit" onClick={() => handleEdit(post.id)}>
          Edit
        </button>
      </form>
    </main>
  );
};

export default EditPost;
