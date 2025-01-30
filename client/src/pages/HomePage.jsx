import React from "react";
import NavBar from "../components/UI/NavBar";
import DataBase from "../components/UI/DataBase";

const HomePage = (users) => {
  return (
    <div>
      <NavBar />
      <DataBase users={users.users} />
    </div>
  );
};

export default HomePage;
