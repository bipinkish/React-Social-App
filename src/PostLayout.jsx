import React from "react";
import { Link, Outlet } from "react-router-dom";

const PostLayout = () => {
  return (
    <ul>
      <li>
        <Link to={"/post-page/1"}>Post 1</Link>
      </li>
      <li>
        <Link to={"/post-page/2"}>Post 2</Link>
      </li>
      <li>
        <Link to={"/post-page/3"}>Post 3</Link>
      </li>
      <Outlet />
    </ul>
  );
};

export default PostLayout;
