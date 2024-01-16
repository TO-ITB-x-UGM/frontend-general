import { useHistory } from "react-router-dom";
import "../pages/Attempt/Attempt.css";
import  {Link} from "react-router-dom"
const HeaderTo = () => {
  // const history = useHistory();
  return (
    <div className="judul">
        <Link to="/dashboard">
      <div>
        <h4>
          <b className="judul_to">TO</b>
          <b className="judul_to_2">ITB x UGM</b>
        </h4>
      </div>
        </Link>
      <div>

        <img src="assets/images/logo_itb.png" alt="logo_ITB" />
        <img src="assets/images/logo_ugm.png" alt="logo_UGM" />
      </div>
    </div >
  );
};
export default HeaderTo;
