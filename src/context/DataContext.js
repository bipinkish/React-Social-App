import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useWindow from "../hooks/useWindow";
import useAxiosFetch from "../hooks/useAxiosFetch";
import apiRequest from "../api/apiRequest";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const { width } = useWindow();
  const { data, errorMessage, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );
  const navigate = useNavigate();

  useEffect(() => {
    setPosts(data);
  }, [data]);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = new Date();
    const month = now.toLocaleString("en-US", { month: "long" });
    const date = now.toLocaleString("en-US", { day: "2-digit" });
    const time = now.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    const newPost = {
      id: posts.length ? posts[posts.length - 1].id + 1 : 1,
      title: postTitle,
      datetime: `${month} ${date} ${time}`,
      body: postBody,
    };
    try {
      const response = await apiRequest.post("/posts", newPost);
      setPosts([...posts, response.data]);
      setPostTitle("");
      setPostBody("");
      console.log(newPost);
      navigate("/");
    } catch (err) {
      if (err.response) {
        console.log(err.response.status);
      } else {
        console.log(`Error : ${err.response.message}`);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiRequest.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      navigate("/");
    } catch (err) {
      if (err.response) {
        console.log(err.response.status);
      } else {
        console.log(`Error : ${err.response.message}`);
      }
    }
  };

  const handleEdit = async (id) => {
    const now = new Date();
    const month = now.toLocaleString("en-US", { month: "long" });
    const date = now.toLocaleString("en-US", { day: "2-digit" });
    const time = now.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    try {
      const updatedPost = {
        id,
        title: editTitle,
        body: editBody,
        datetime: `${month} ${date} ${time}`,
      };
      const response = await apiRequest.put(`/posts/${id}`, updatedPost);
      const updatedPosts = posts.map((post) =>
        post.id === id ? { ...response.data } : post
      );
      setPosts(updatedPosts);
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      if (err.response) {
        console.log(err.response.status);
      } else {
        console.log(`Error : ${err.response.message}`);
      }
    }
  };
  return (
    <DataContext.Provider
      value={{
        width,
        search,
        setSearch,
        searchResults,
        errorMessage,
        isLoading,
        handleSubmit,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        posts,
        editTitle,
        editBody,
        setEditBody,
        handleEdit,
        setEditTitle,
        handleDelete,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
