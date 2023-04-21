import "./viewHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Notification from "../../components/notifications/Notifications";


const ViewHotel = () => {
  const location = useLocation();
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const path = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch("/rooms");
  const { data: userData } = useFetch(`/hotels/find/${path}`);
  const [notification, setNotification] = useState(false);


  // useEffect(() => {

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  console.log(files)

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dui5pbcjj/image/upload",
            data,
            { withCredentials: false }
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newhotel = {
        ...info,
        rooms,
        photos: list,
      };

      await axios.put(`/hotels/${path}`, newhotel);
      setNotification(true);

    } catch (err) { console.log(err) }
  };

  const handleCloseNotification = () => {
    setNotification(false);
  };

  return (
    <div className="new">
         {notification && (
      <Notification
        message="New user has been added successfully!"
        onClose={handleCloseNotification}
      />
    )}
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom">
          <div className="left">

            {userData && userData.photos && userData.photos.length > 0 ? (
              <img src={userData.photos[0]} alt="" />
            ) : (
              <img src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" alt="" />
            )}

          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>

                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
                {/* <label for="file-upload" class="custom-file-upload">
                {userData && userData.photos && (
                  <img src={userData.photos[0]} alt="" />
                )}
                </label> */}

              </div>

              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={
                      input.id === 'name'
                        ? userData['name']
                        : input.id === 'address'
                          ? userData['address']
                          : input.id === 'city'
                            ? userData['city']
                            : input.id === 'title'
                              ? userData['title']
                              : input.id === 'type'
                                ? userData['type']
                                : input.id === 'distance'
                                  ? userData['distance']
                                  : input.id === 'title'
                                    ? userData['title']
                                    : input.id === 'cheapestPrice'
                                      ? userData['cheapestPrice']
                                      : input.id === 'desc'
                                        ? userData['desc']
                                        : input.placeholder
                    }
                  />
                </div>
              ))}



              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange} defaultValue={userData['featured']}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect} value={userData.rooms}>
                  {loading
                    ? "loading"
                    : data &&
                    data.map((room) => (
                      <option key={room._id} value={room._id}>
                        {room.title}
                      </option>
                    ))}
                </select>

              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
   
    </div>
    
  );
};

export default ViewHotel;
