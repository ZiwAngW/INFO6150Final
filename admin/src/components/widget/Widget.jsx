import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  let data_w;
  const { data: hotelData, loading, error } = useFetch("/hotels");
  const { data: userData } = useFetch("/users"); // Add this line to fetch user data
  const { data: bookData } = useFetch("/hotels/bookings");
  const [numHotel, setNumHotel] = useState(0);
  const [numUser, setNumUser] = useState(0);
  const [bookings, setBook] = useState(0);
  const [cost, setCost] = useState(0);


  useEffect(() => {
    if (hotelData) {
      setNumHotel(hotelData.length);
    }
  }, [hotelData]);

  useEffect(() => {
    if (bookData) {
      setBook(bookData.count);
      let totalPrice = 0;
    for (let i = 0; i < bookData.data.length; i++) {
      totalPrice += bookData.data[i].room.price;
    }
    setCost(totalPrice);
      
    }
  }, [bookData]);

  
  useEffect(() => {
    if (userData) {
      setNumUser(userData.length);
    }
  }, [userData]);
  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data_w = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        value: numUser,
        route:"/users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data_w = {
        title: "HOTELS",
        isMoney: false,
        route:"/hotels",

        value: numHotel,
        link: "View alL hotels",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data_w = {
        title: "BOOKINGS",
        isMoney: false,
        route:"/",

        value: bookings,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data_w = {
        title: "EARNINGS",
        isMoney: true,
        route:"/",

        value: cost,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data_w.title}</span>
        <span className="amount">
        {data_w.isMoney ? "$" : ""} {data_w.value}
        </span>
        <Link to={data_w.route} style={{ textDecoration: "none" }} >
        <span className="link" >{data_w.link}</span>
          </Link>
        
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {diff} %
        </div>
        {data_w.icon}
      </div>
    </div>
  );
};

export default Widget;
