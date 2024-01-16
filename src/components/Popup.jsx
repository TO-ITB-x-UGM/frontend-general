import { BsXLg } from "react-icons/bs";
import { FiXCircle } from "react-icons/fi";
import { IconContext } from "react-icons";
import "./Popup.css";
import { useState } from "react";

const Popup = (props) => {
  const handleClose = () => {
    props.close();
  };
  const [yakin, setYakin] = useState(false);
  const handleConfirm = () => {
    setYakin(true);
    props.confirm.quiz();
  };
  return (
    <>
      <div
        className="popup"
        style={{ display: props.toggle ? "block" : "none" }}
      >
        <div className="close" style={{ display: yakin ? "none" : "block" }}>
          <IconContext.Provider value={{ size: 30 }}>
            <FiXCircle className="close_button" onClick={handleClose} />
          </IconContext.Provider>
        </div>
        <div className="popup-message">
          <h1>{props.message}</h1>
          <button
            className="confirm"
            onClick={handleConfirm}
            style={{ display: yakin ? "none" : "block" }}
          >
            Akhiri
          </button>
        </div>
      </div>
    </>
  );
};
export default Popup;
