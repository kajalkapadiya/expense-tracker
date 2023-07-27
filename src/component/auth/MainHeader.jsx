import "./mainHeader.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./xtra";

const MainHeader = () => {
  const isLoggedIn = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };
  return (
    <header>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">ExpenseTracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/product">Product</Nav.Link>
            <Nav.Link href="/about">About Us</Nav.Link>
            <Nav.Link href="/login"></Nav.Link>
          </Nav>
          <div>
            {isLoggedIn && (
              <Button
                style={{
                  backgroundColor: "rgb(0, 50, 200)",
                  border: "none",
                  borderBottom: "rgb(0,255,0)",
                  borderRadius: "1rem",
                }}
                onClick={logoutHandler}
              >
                Logout
              </Button>
            )}
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default MainHeader;
