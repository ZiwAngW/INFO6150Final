import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const List = () => {
  const location = useLocation();

  const path = location.pathname.split("/")[2];
  console.log("THIS IS PATH", path);
  // const { data, loading, error } = useFetch("/hotels/bookings");
  // const { data, loading, error } = useFetch(`/hotels/bookings?users=${path}`);

  const [data, setData] = useState([]);
  
useEffect(() => {  
  if (path) {
  console.log("I am in this path ");
  // apiCall = `/hotels/bookings?users=${path}`;
  fetch(`http://house-hub.eastus.cloudapp.azure.com:8800/api/hotels/bookings?user=${path}`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(response => response.json())
    .then(data => {
      console.log("data",data);
      setData(data);
    })
    .catch(error => {
      // handle the error here
    });
} else {
  fetch(`http://house-hub.eastus.cloudapp.azure.com/api/hotels/bookings`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(response => response.json())
    .then(data => {
      console.log("data",data);
      setData(data);
    })
    .catch(error => {
      // handle the error here
    });
}
}, [path]);

  // const { data, loading, error } = useFetch(apiCall);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString([], options);
  };

  // if (!loading) {
  //   console.log("THIS IS DATAAAA", data.data);
  // }

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Booking ID</TableCell>
            <TableCell className="tableCell">Hotel Logo</TableCell>
            <TableCell className="tableCell">Hotel Name</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(
  data.data &&
  data.data.length > 0 ? (
    data.data.map((row) => (
      <TableRow key={row._id}>
        <TableCell className="tableCell">{row._id}</TableCell>
        <TableCell className="tableCell">
          <div className="cellWrapper">
            <img src={row.hotel.photo} alt="" className="image" />
            {row.product}
          </div>
        </TableCell>
        <TableCell className="tableCell">{row.hotel.name}</TableCell>
        <TableCell className="tableCell">{row.user}</TableCell>
        <TableCell className="tableCell">{formatDate(row.createdAt)}</TableCell>
        <TableCell className="tableCell">$ {row.room.price}</TableCell>
        <TableCell className="tableCell">
          <span className={`status ${row.status}`}>{row.status}</span>
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={7} className="tableCell">
        No data
      </TableCell>
    </TableRow>
  )
)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
