import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { AuthContext } from "../../context/AuthContext";
import "./login.css";
const Register =()=>{
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
        email:undefined,
        phone:undefined,
        city:undefined,
        country:undefined
      });
    
      
    
      const navigate = useNavigate()
    
      const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
      };

      const toHome = ()=>{
        navigate(`../`)
      }
    
      const handleClick = async (e) => {
        e.preventDefault();
        
        try {
          await axios.post("/auth/register", credentials);
          //console.log(credentials)
          alert("success !")
          navigate("/")
        } catch (err) {
          console.log(err)
        }
      };
    
    
      return (
        <div className="login">
          <div className="lContainer">
            <input
              type="text"
              placeholder="username"
              id="username"
              onChange={handleChange}
              className="lInput"
              required
            />
            <input
              type="text"
              placeholder="email"
              id="email"
              onChange={handleChange}
              className="lInput"
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              id="phone"
              onChange={handleChange}
              className="lInput"
              required
            />
            <input
              type="text"
              placeholder="city"
              id="city"
              onChange={handleChange}
              className="lInput"
              required
            />
            <input
              type="text"
              placeholder="country"
              id="country"
              onChange={handleChange}
              className="lInput"
              required
            />
            <input
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
              className="lInput"
              required
            />
            <button onClick={handleClick} className="lButton">
              Register
            </button>
            <button onClick={toHome} className="lButton">
              Go back
            </button>

            
          </div>
        </div>
      );
}
export default Register;