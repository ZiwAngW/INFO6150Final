import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Container, Form, Button } from "react-bootstrap";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const toHome = () => {
    navigate(`../`)
  }

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };


  // return (
  //   <div className="login">
  //     <div className="lContainer">
  //       <input
  //         type="text"
  //         placeholder="username"
  //         id="username"
  //         onChange={handleChange}
  //         className="lInput"
  //       />
  //       <input
  //         type="password"
  //         placeholder="password"
  //         id="password"
  //         onChange={handleChange}
  //         className="lInput"
  //       />
  //       <button disabled={loading} onClick={handleClick} className="lButton">
  //         Login
  //       </button>
  //       {error && <span>{error.message}</span>}
  //     </div>
  //   </div>
  // );
  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={handleClick}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
      {error && <span>{error.message}</span>}
      <Button variant="primary" onClick={toHome}>
          Go Back
      </Button>
    </Container>


  );
};

export default Login;
