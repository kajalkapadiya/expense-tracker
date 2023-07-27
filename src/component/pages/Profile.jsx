import { useRef } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const nameRef = useRef();
  const photoRef = useRef();
  const history = useHistory();
  const mail = localStorage.getItem("token");

  const submitHandler = async () => {
    const enteredName = nameRef.current.value;
    const enteredLink = photoRef.current.value;

    console.log(enteredName);
    console.log(enteredLink);

    const updateData = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC-CoMe6npVYnA1rbm7L3IWYJO0hb3ADGA`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("_id"),
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await updateData.json();
    console.log(response);
  };

  const cancelHandler = () => {
    history.replace("/home");
  };

  return (
    <div className="container" style={{ float: "right" }}>
      <div className="border-bottom">
        <div>
          <h2 style={{ marginTop: "2.5rem" }}>Contact Details</h2>
          <Button
            variant="outline-primary"
            style={{ float: "right" }}
            onClick={cancelHandler}
          >
            Cancel
          </Button>
        </div>
        <form>
          <label>Full Name</label>
          <input type="text" ref={nameRef} required />
          <label>Profile Photo URL</label>
          <input type="text" ref={photoRef} required />
          <Button
            onClick={submitHandler}
            variant="danger"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};
export default Profile;
