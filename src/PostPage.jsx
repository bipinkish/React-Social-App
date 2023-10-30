import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import DataContext from "./context/DataContext";

const PostPage = () => {
  const { posts, handleDelete } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  console.log(post);

  return (
    <main className="PostPage">
      <article className="post">
        {post ? (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button className="editButton" type="button">
                Edit
              </button>
            </Link>
            <button
              className="deleteButton"
              type="button"
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <h2>Post Not Found !</h2>
            <p>Try finding other post.</p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
