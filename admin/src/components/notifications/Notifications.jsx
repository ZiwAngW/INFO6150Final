import { useState, useEffect } from "react";
import "./notifications.scss";

const Notification = ({ message, onClose }) => {
  const [visible, setVisible] = useState(false);
    
  useEffect(() => {
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${visible ? "visible" : ""}`}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
