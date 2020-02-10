import React from "react";
import { Switch, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Feed from "./components/Feed/Feed";

const App = () => {
  return (
    <div className="flex h-screen text-sm font-sans">
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-auto h-full">
        <div className="max-w-screen-md mx-auto my-10 p-10">
          <Switch>
            <Route path="/feed/:feedId" component={Feed}></Route>
            <Route path="/" component={Home}></Route>
          </Switch>
        </div>
      </main>
    </div>
  );
};

export default App;
