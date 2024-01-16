import HeaderTo from "../../components/HeaderTo";
import { BiLogOut, BiHomeAlt, BiCalculator } from "react-icons/bi"
import { BsFillEmojiSmileFill } from "react-icons/bs"
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./dashboard.css"
import Account from "../../api/account";
import Swal from "sweetalert2";
import { removeAccessToken } from "../../utils/auth";
import { removeAnswerToken } from "../../utils/answer";

function Dashboard() {

    const style = { fontSize: "5rem" }
    const history = useHistory();
    const [profile, setProfile] = useState({});

    useEffect(() => {
        Account.getProfile().then((result) => {
            console.log(result);
            if (result.data.ok) {
                setProfile(result.data.data.account);
            }
        })
    }, []);

    const handleProfile = () => {
        Swal.fire({
            icon: 'info',
            title: 'Mohon maaf',
            text: 'Fitur masih dalam pengembangan'
        });
    }

    const handleLogout = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Konfirmasi',
            text: 'Apakah anda yakin ingin keluar?',
            showCancelButton: true,
            cancelButtonText: 'Batal',
            confirmButtonText: 'Ya, keluar'
        }).then((response) => {
            if (response.isConfirmed) {
                removeAccessToken();
                removeAnswerToken();
                history.push('/')
                window.location.reload();
            }
        });
    }

    return (
        <div className="body">
            <HeaderTo />
            <div className="profile">
                <div className="container">
                    <div className="card">
                        <div className="imgBx" >
                            <BsFillEmojiSmileFill style={style} />
                        </div>
                        <div className="contentBx">
                            <h2 className="nama">{profile.name}</h2>
                            <div className="size">
                                <h3>Sekolah : {profile.school}</h3>
                            </div>
                            <div className="color">
                                <h3>Gmail : {profile.email}</h3>
                            </div>
                            <a href="#">A Great Day</a>
                        </div>
                    </div>
                </div>
            </div>

            <button className="navButton" onClick={handleProfile}> <BiHomeAlt /> Profile </button>
            <button className="navButton" onClick={useCallback(() => history.push('/tryout'), [history])}> <BiCalculator /> Tryout </button>
            <button className="navButton" onClick={handleLogout}> <BiLogOut /> Logout </button>
        </div>
    )

}

export default Dashboard