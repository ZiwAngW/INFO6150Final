import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    email: undefined,
    phone: undefined,
    city: undefined,
    country: undefined
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toHome = () => {
    navigate(`../`);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/auth/register", credentials);
      alert("Success! You have registered successfully.");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="register-page"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1554384645-13eab165c24b')`
      }}
    >
      <Container>
        <Card className="register-card">
          <Card.Body>
            <h1 className="register-heading">Register</h1>
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

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  name="phone"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter City"
                  name="city"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Country"
                  name="country"
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

              <div className="btn">
                <Button variant="primary" type="submit">
                  Register
                </Button>
                <Button variant="primary" onClick={toHome}>
                  Go Back
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
