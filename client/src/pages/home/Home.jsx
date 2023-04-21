import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";
import {
  faHeart,
  faLightbulb
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <div className="HomeOptions">
          <FontAwesomeIcon icon={faLightbulb} className="HomeIcon" />
          <h1 className="homeTitle">Browse by Housing Type</h1>
        </div>
        <PropertyList />
        <div className="HomeOptions">
          <FontAwesomeIcon icon={faHeart} className="HomeIcon" />
          <h1 className="homeTitle">Homes guests love</h1>
        </div>
        <FeaturedProperties />
        <MailList /><Footer />
      </div>
    </div>
  );
};

export default Home;
