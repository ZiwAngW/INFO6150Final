import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
//import { useState } from "react";
// import { format } from "date-fns";
// import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const Category = () => {
    
    const location = useLocation();
    const { data, loading,error} = useFetch(
        `/hotels/type/${location.state.destination}`
    );
   
   
    return (
        <div>
            <Navbar />
            <Header type="list" />
            <div className="listContainer">
                <div className="listWrapper">
                    <div className="listResult">
                        {loading ? (
                            "loading"
                        ) : (
                            data.length>0?(<>
                                {data.map((item) => (
                                    <SearchItem item={item} key={item._id} />
                                ))}
                            </>):<div>No data found</div>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Category;