import React, { useContext } from "react";
import Feed from "./Feed";
import DataContext from "./context/DataContext";

const Home = () => {
  const { searchResults, errorMessage, isLoading } = useContext(DataContext);
  return (
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading Posts...</p>}
      {!isLoading && errorMessage && (
        <p className="statusMsg" style={{ color: "red" }}>
          {errorMessage}
        </p>
      )}
      {!isLoading &&
        !errorMessage &&
        (searchResults.length ? (
          <Feed posts={searchResults} />
        ) : (
          <p className="statusMsg" style={{ margin: "2px" }}>
            No Posts to display!
          </p>
        ))}
    </main>
  );
};

export default Home;
