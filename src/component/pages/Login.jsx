import { useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../auth/xtra";

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const confirmRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const passHandler = () => {
    history.replace("/forgot");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const emailInput = emailRef.current.value;
    const passInput = passRef.current.value;
    const confirmPass = confirmRef.current.value;

    if (passInput === confirmPass) {
      setIsLoading(true);
      let url;
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-CoMe6npVYnA1rbm7L3IWYJO0hb3ADGA";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-CoMe6npVYnA1rbm7L3IWYJO0hb3ADGA";
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: emailInput,
          password: passInput,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed";
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          const dataEmail = data.email;
          const dataId = data.idToken;
          dispatch(authActions.login({ dataEmail, dataId }));
          // authCntx.login(data.email);
          // authCntx.login(data.idToken);
          console.log("login");
          history.replace("/");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("please fill the correct password");
    }
  };

  return (
    <>
      <Card
        className="container"
        style={{
          width: "25rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10rem",
        }}
      >
        <h1>{isLogin ? "Login" : "SignUp"}</h1>
        <form onSubmit={submitHandler} action="/action_page.php">
          <div className="form-group">
            <label htmlFor="email">email</label>
            <input
              type="text"
              id="email"
              ref={emailRef}
              required
              className="form-control"
              placeholder="Enter email"
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="pass">password</label>
            <input
              type="password"
              id="pass"
              ref={passRef}
              required
              className="form-control"
              placeholder="Enter password"
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="pass">confirm password</label>
            <input
              type="password"
              id="confirmPass"
              ref={confirmRef}
              required
              autoComplete="off"
              className="form-control"
              placeholder="Confirm password"
            ></input>
          </div>
          <div>
            <Button variant="link" onClick={passHandler}>
              forgot password
            </Button>
          </div>
          <div>
            {!isLoading && (
              <button>{isLogin ? "Login" : "create account"}</button>
            )}
            {isLoading && <p>Sending request...</p>}
            <button type="button" onClick={switchAuthModeHandler}>
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default Login;
