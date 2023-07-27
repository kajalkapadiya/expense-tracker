import "./home.css";
import { Button } from "react-bootstrap";
import Expenses from "../Expenses";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Home = () => {
  const authCntx = useSelector((state) => state.auth.id);

  const history = useHistory();

  const linkHandler = () => {
    history.replace("/profile");
  };

  const varifyHandler = async () => {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC-CoMe6npVYnA1rbm7L3IWYJO0hb3ADGA",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: authCntx,
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
    <div style={{ position: "relative" }}>
      <div className="border-bottom">
        <p style={{ position: "absolute" }}>Welcome to Expense Tracker</p>
        <div style={{ position: "absolute", right: "0" }}>
          Your profile is incomplete
          <Button variant="link" onClick={linkHandler}>
            Complete now
          </Button>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <div
          style={{ position: "absolute", right: "8rem", marginTop: "1.7rem" }}
        >
          <Button
            variant="link"
            onClick={varifyHandler}
            className="position-fixed"
          >
            verify email id
          </Button>
        </div>
      </div>
      <hr style={{ marginTop: "5rem" }} />

      <div style={{ marginTop: "0.1rem", textAlign: "center" }}>
        <Expenses />
      </div>
    </div>
  );
};

export default Home;
