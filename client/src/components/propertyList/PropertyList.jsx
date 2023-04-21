import useFetch from "../../hooks/useFetch";
import "./propertyList.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { useState,useEffect } from "react";
const PropertyList = () => {
  
  const { data, loading, error } = useFetch("/hotels/countByType");
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  
  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();
  const handleCategory =(destination) =>{
    dispatch({ type: "NEW_SEARCH", payload: { destination,dates } });
    navigate("/category", { state: { destination,dates } });
  }
  const images = [
    "https://unsplash.com/photos/_dS27XGgRyQ/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NHx8aG90ZWx8ZW58MHx8fHwxNjgxOTkyMDU1&force=true",
    "https://unsplash.com/photos/3wylDrjxH-E/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8MTF8fGFwcGFydG1lbnRzfGVufDB8fHx8MTY4MjAwMDAzNg&force=true",
    "https://unsplash.com/photos/qai_Clhyq0s/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjgyMDI4MDU4&force=true",
    "https://unsplash.com/photos/Id7u0EkTjBE/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NXx8dmlsbGFzfGVufDB8fHx8MTY4MjAxNjE1NA&force=true",
    "https://unsplash.com/photos/9-qFzV9a2Zc/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjgyMDI5MjU0&force=true",
  ];
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img,i) => (
              <div className="pListItem" key={i} onClick={()=>handleCategory(data[i]?.type)}>
                <img
                  src={img}
                  alt=""
                  className="pListImg"
                />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>{data[i]?.count} {data[i]?.type}</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
