import Header from "./components/Header";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import Detail from "./components/Detail";
import { createContext, useEffect, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
const Appstate = createContext();
function App() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  useEffect(() => {});
  return (
    <Appstate.Provider value={{ login, username, setLogin, setUsername }}>
      <Header />
      <Routes>
        <Route path="/" element={<Cards />} />
        <Route path="addMovie" element={<AddMovie />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Footer />
    </Appstate.Provider>
  );
}

export default App;
export { Appstate };
