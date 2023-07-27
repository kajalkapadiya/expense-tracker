import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./component/pages/Home";
import Product from "./component/pages/Product";
import MainHeader from "./component/auth/MainHeader";
import Login from "./component/pages/Login";
import About from "./component/pages/About";
import Profile from "./component/pages/Profile";
import ForgotPass from "./component/ForgotPass";
import { useSelector } from "react-redux";
import { createContext, useState } from "react";

const MyTheme = createContext();

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isAuth);
  const [myStyle, setMyStyle] = useState({
    color: "black",
    backgroundColor: "white",
  });

  const toggleTheme = () => {
    if (myStyle.color === "white") {
      setMyStyle({
        color: "black",
        backgroundColor: "white",
      });
    } else {
      setMyStyle({
        color: "white",
        backgroundColor: "black",
      });
    }
  };

  return (
    <div style={myStyle} className="app-container">
      <MyTheme.Provider value={toggleTheme}>
        <MainHeader />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            {isLoggedIn && <Home myStyle={myStyle} toggleTheme={toggleTheme}/>}
            {!isLoggedIn && <Redirect to="/login" />}
          </Route>
          <Route path="/product">
            {isLoggedIn && <Product />}
            {!isLoggedIn && <Redirect to="/login" />}
          </Route>
          <Route path="/about">
            {isLoggedIn && <About />}
            {!isLoggedIn && <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/forgot">
            <ForgotPass />
          </Route>
        </Switch>
      </MyTheme.Provider>
    </div>
  );
}

export default App;
export { MyTheme };
