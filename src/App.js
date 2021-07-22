import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupCategoryPage from "./pages/SignupCategoryPage";

function App() {
  return (
    <div>
      <SignupCategoryPage />
    </div>
  );
}

export default App;
