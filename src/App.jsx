import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Home } from "./components/Home";
import { Add } from "./components/Add";
import { Update } from "./components/Update";
import { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const AppContext = createContext();

function App() {
  const client = new QueryClient();

  const [userData, setUserData] = useState({});

  const [updateTitle, setUpdateTitle] = useState("");
  const [updateId, setUpdateId] = useState("");

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          userData,
          setUserData,
          updateTitle,
          setUpdateTitle,
          updateId,
          setUpdateId,
        }}
      >
        <QueryClientProvider client={client}>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="/home" element={<Home />} />
              <Route path="/add" element={<Add />} />
              <Route path="/update" element={<Update />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
