import useFetch from "../../hooks/useFetch";
import "./featured.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { useState } from "react";
const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=boston,new york,los angeles"
  );
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  
  const { dispatch } = useContext(SearchContext);
  const navigate = useNavigate();
  const handleFeatured =(destination) =>{
    dispatch({ type: "NEW_SEARCH", payload: { destination,dates } });
    navigate("/featuredPage", { state: { destination,dates } });
  }
  
  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem" onClick={()=>handleFeatured("boston")}>
            <img
              src="https://unsplash.com/photos/NrDYqseeAxk/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8NXx8Ym9zdG9ufGVufDB8fHx8MTY4MjAyOTEwOA&force=true"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Boston</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem" onClick={()=>handleFeatured("new york city")}>
            <img
              src="https://unsplash.com/photos/MxTlLsgPmik/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8bmV3JTIweW91ciUyMGNpdHl8ZW58MHx8fHwxNjgyMDI5MTY3&force=true"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>New York City</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem" onClick={()=>handleFeatured("los angeles")}>
            <img
              src="https://unsplash.com/photos/UZVlSjrIJ3o/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8bG9zJTIwYW5nZWxlc3xlbnwwfHx8fDE2ODIwMjkwNzE&force=true"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Los Angeles</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
