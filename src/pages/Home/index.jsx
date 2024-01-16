import React, {useCallback, useEffect, useRef} from "react";
// import { Chrono } from "react-chrono";
import { MdSegment } from "react-icons/md";
import { useHistory } from "react-router-dom";
import Auth from "../../api/auth";
import { setAccessToken } from "../../utils/auth";
import Swal from "sweetalert2";
import { FiInstagram } from "react-icons/fi"
import { AiOutlineWhatsApp } from "react-icons/ai"
import { useGoogleLogin } from '@react-oauth/google';

function Home() {
    let history = useHistory();
    const handleOnClick = useCallback(() => history.push('/login'), [history]);
    // const preloader = useRef(null);
    //  useEffect(() => {
    //     const preloaders = preloader.current;
    //
    //      preloaders.classList.remove("right-panel-active");
    //      preloaders.classList.add("right-panel-active");
    //   }, []);

    //this.spinnerwrapper = React.createRef();

    const style = { fontSize: "2rem", marginLeft: "6vw" }
    const responseGoogle = (response) => {
        console.log(response);
        if (response.code) {
            try {
                Auth.loginWithGoogle(response.code).then((result) => {
                    console.log(response.code)
                    if (result.data.ok) {
                        setAccessToken(result.data.data.access_token);
                        history.push("/dashboard");
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: result.data.message
                        });
                    }
                });
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                });
            }
        } else {
            console.log(response);
        }
    }
    const responseGoogleError = (err) => {
        console.log(err);
    }
    const login = useGoogleLogin({
        onSuccess: codeResponse => responseGoogle(codeResponse),
        onError: codeResponse => responseGoogleError(codeResponse) ,
        flow: 'auth-code',
    });

    return (
        <div data-spy="scroll" data-target=".fixed-top">
            {/* <!-- Preloader --> */}
            {/*<div className="spinner-wrapper" ref={preloader}>*/}
            {/*    <div className="spinner">*/}
            {/*        <div className="bounce1"></div>*/}
            {/*        <div className="bounce2"></div>*/}
            {/*    </div>*/}

            {/*</div>*/}
            {/* <!-- end of preloader --> */}
            <div>
                <header id="header" className="header">
                    <div className="header-content">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 col-xl-5">
                                    <div className="text-container">
                                        <h1>Try Out ITB x UGM</h1>
                                        <p className="p-large">Asah kemampuanmu dalam menghadapi UTBK dengan soal dari kakak-kakak yang telah berhasil lolos pada seleksi perguruan tinggi ITB dan UGM.</p>

                                        <div>
                                            <button className="btn-solid-lg page-scroll" onClick={handleOnClick} >Masuk</button>
                                        </div>
                                    </div> {/* <!-- end of text-container --> */}
                                </div> {/* <!-- end of col --> */}
                                <div className="col-lg-6 col-xl-7">
                                    <div className="image-container">
                                        <div className="img-wrapper">
                                            <img className="img-fluid" src="assets/images/header-software-app.png" alt="alternative" />
                                        </div> {/* <!-- end of img-wrapper --> */}
                                    </div> {/* <!-- end of image-container --> */}
                                </div> {/* <!-- end of col --> */}
                            </div> {/* <!-- end of row --> */}
                        </div> {/* <!-- end of container --> */}
                    </div> {/* <!-- end of header-content --> */}
                </header> {/* <!-- end of header --> */}
                <svg className="header-frame" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1920 310"><defs></defs><title>header-frame</title><path className="cls-1" d="M0,283.054c22.75,12.98,53.1,15.2,70.635,14.808,92.115-2.077,238.3-79.9,354.895-79.938,59.97-.019,106.17,18.059,141.58,34,47.778,21.511,47.778,21.511,90,38.938,28.418,11.731,85.344,26.169,152.992,17.971,68.127-8.255,115.933-34.963,166.492-67.393,37.467-24.032,148.6-112.008,171.753-127.963,27.951-19.26,87.771-81.155,180.71-89.341,72.016-6.343,105.479,12.388,157.434,35.467,69.73,30.976,168.93,92.28,256.514,89.405,100.992-3.315,140.276-41.7,177-64.9V0.24H0V283.054Z" /></svg>
                {/* <!-- end of header --> */}
                <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
                    <div className="container">

                        {/* <!-- Text Logo - Use this if you don't have a graphic logo --> */}
                        <a className="navbar-brand logo-text page-scroll" href="home">ITB x UGM</a>


                        {/* <!-- Mobile Menu Toggle Button --> */}
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                            <span><MdSegment /></span>
                        </button>
                        {/* <!-- end of mobile menu toggle button --> */}

                        <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    {/* <a className="" href="#header">HOME<span className="sr-only">(current)</span></a> */}
                                </li>
                            </ul>
                            <span className="nav-item">
                                <button className="btn-solid-lg page-scroll" onClick={handleOnClick} >Masuk</button>
                            </span>
                        </div>
                    </div>{/*  <!-- end of container --> */}
                </nav>
                {/* webinar */}
                <div className="card-container">
                    {/* <div className="judul-webinar">Webinar</div>
                    <div className="card card-custom bg-white border-white border-0">
                        <div className="card-custom-img"></div>
                        <div className="card-custom-avatar">
                            <img className="img-fluid" src="assets/images/zoom.png" alt="Avatar" />
                        </div>
                        <div className="card-body">
                            <h4 className="card-title">Webinar zoom</h4>
                            <p className="card-text">Ikuti webinar bersama kami dan dapatkan info kampus beserta program studinya pada tanggal 25 Januari 2022.</p>
                        </div>
                        <div className="card-footer">
                            <a href="#" className="btn btn-primary">Join</a>
                        </div>
                    </div> */}
                </div>
                {/* End of webinar */}
                {/* /* timeline */}
                <div className="judul-timeline">
                    {/* Timeline */}
                </div>
                <div className="container-timeline">
                    {/* <div className="timeline">
                        <div className="timeline-container">
                            <div className="timeline-icon">
                                <div className="angka-timeline">
                                    1
                                </div>
                            </div>
                            <div className="timeline-body">
                                <h4 className="timeline-title"><span className="badge">1 - 28 Januari</span></h4>
                                <p className="timeline-txt">Rentang waktu pembayaran tryout</p>
                            </div>
                        </div>
                        <div className="timeline-container">
                            <div className="timeline-icon">
                                <div className="angka-timeline">
                                    2
                                </div>
                            </div>
                            <div className="timeline-body">
                                <h4 className="timeline-title"><span className="badge">25 Januari</span></h4>
                                <p className="timeline-txt">Pelaksanaan webinar</p>
                            </div>
                        </div>
                        <div className="timeline-container">
                            <div className="timeline-icon">
                                <div className="angka-timeline">
                                    3
                                </div>
                            </div>
                            <div className="timeline-body">
                                <h4 className="timeline-title"><span className="badge">25 - 29 Januari</span></h4>
                                <p className="timeline-txt">Rentang waktu pendaftaran di website</p>
                            </div>
                        </div>
                        <div className="timeline-container">
                            <div className="timeline-icon">
                                <div className="angka-timeline">
                                    4
                                </div>
                            </div>
                            <div className="timeline-body">
                                <h4 className="timeline-title"><span className="badge">30 - 31 Januari</span></h4>
                                <p className="timeline-txt">Pelaksanaan tryout</p>
                            </div>
                        </div>
                    </div> */}
                </div>
                {/* /* end of timeline*/}
                <div className="bawah">
                    <div className="container">
                        <div className="footer-txt">Sponsor</div>
                        <div className="sponsor">
                            <img className="logo-sponsor" src="assets/images/sponsor/pakbagus.png" alt="logo" />
                        </div>
                    </div>
                </div>

                <div className="footer-bawah">
                    <div className="tulisan-footer">Kontak</div>
                    <a href="https://www.instagram.com/gijo_official/"><FiInstagram style={style} /></a>
                    <a href="https://wa.me/+62895700322220"><AiOutlineWhatsApp style={style} /></a>
                </div>
            </div>
        </div>


    )

}

export default Home;