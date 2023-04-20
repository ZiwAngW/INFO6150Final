import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Card, Form, Button } from "react-bootstrap";
import "./login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="overlay"></div>
      <Card className="login-card">
        <h2 className="text-center mb-4">Login</h2>
        <Form>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={credentials.username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            onClick={handleClick}
            className="login-button"
          >
            Login
          </Button>
          {error && <div className="text-danger">{error.message}</div>}
          <div className="text-center mt-3">
            Don't have an account?{" "}
            <Button variant="link" href="/signup">
              Sign up
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
