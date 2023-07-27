import { useRef } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const ForgotPass = () => {
  const emailRef = useRef();
  const history = useHistory();

  const loginPage = () => {
    history.replace("/login");
  };

  const passReset = async () => {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA6u40Nb9HXTek3wHmH2Bzig8_V1TdUdWo",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: emailRef.current.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
  };
  return (
    <div>
      <h4>Enter the email with which you have registered</h4>
      <input type="text" placeholder="Email" ref={emailRef}></input>
      <br />
      <Button onClick={passReset}>Send Link</Button>
      <br />
      <Button variant="link" onClick={loginPage}>
        Alreayd a user? Login
      </Button>
    </div>
  );
};
export default ForgotPass;
