import React, { useEffect, useState } from "react";
import "./Attempt.css";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import Popup from "../../components/Popup";
import Tryout from "../../api/tryout";
import { useParams } from "react-router-dom";
import { setAnswerToken } from "../../utils/answer";
// import LogoITB from "./Assets/logo_itb.png";
// import LogoUI from "./Assets/logo_ui.png";

function Attempt() {
  const { tryoutId, attemptId } = useParams();
  const [popup, setPopup] = useState({
    toggle: false,
    message: "",
    confirm: false,
  });

  const [soal, setSoal] = useState({});
  const [nomer, setNomer] = useState(1);
  const [questions, setQuestions] = useState({});
  const [answers, setAnswers] = useState({
    1: { qid: 4, selected: 1 },
    2: { qid: 7, selected: 2 }
  });

  const [jawaban, setJawaban] = useState({});

  // const [waktu, setWaktu] = useState({
  //   menit: props.waktu,
  //   detik: 0,
  // });
  // ----------FUNCTION---------

  useEffect(() => {
    Tryout.getSubattempt(attemptId).then((result) => {
      if (result.data.ok) {
        setAnswerToken(result.data.data.answer_token);
        setAnswers(result.data.data.answers);
        console.log(result.data.data.answers);
        setQuestions(result.data.data.questions);
      }
      console.log(result);
    });
  }, []);

  useEffect(() => {
    console.log("PUT ANSWER TO SERVER");
    console.log(answers);
    // Tryout.putAnswer({49: 1, });
  }, [nomer])

  const num = [];

  for (let i = 1; i <= questions.length; i++) num.push(i);

  const numberClick = (num) => setNomer(num);
  const openPopup = () => {
    setPopup((prevState) => ({
      ...prevState,
      toggle: true,
      message: "Yakin ingin mengakhiri ujian ini ?",
    }));
  };
  const closePopup = () => {
    setPopup({ confirm: false, toggle: false, message: "" });
  };
  const confirmQuiz = () => {
    let second = 10;
    let myInterval = setInterval(() => {
      if (second > 0) {
        let msg = "Ujian akan tertutup otomatis dalam " + second + " detik !";
        setPopup((prevState) => ({
          ...prevState,
          message: msg,
        }));
        second -= 1;
      } else {
        setPopup((prevState) => ({
          ...prevState,
          toggle: false,
          confirm: true,
        }));
        clearInterval(myInterval);
      }
    }, 1000);
  };

  const jawabSoal = (nom, jawab) => {
    // console.log(nom);
    // console.log(jawab);
    setJawaban((prevState) => ({ ...prevState, [nomer]: jawab }));
  };

  // ----------FUNCTION---------

  // ----------DEBUG----------
  // console.log(popup);
  // console.log(jawaban);
  // ----------DEBUG----------

  return (
    <div className="Tryout_container">
      <div style={{ display: popup.confirm ? "" : "none" }}>
        <h1>QUIZ SELESAI</h1>
      </div>
      <div
        className="main"
        style={{
          filter: popup.toggle ? "blur(20px)" : "",
          display: popup.confirm ? "none" : "",
        }}
      >
        {/* ---------BAGIAN UTAMA--------- */}
        <div className="soal">
          <div className="judul">
            <h4>
              <b className="judul_to">TO</b>
              <b className="judul_to_2">UIxITB</b>
            </h4>
            <div>
              <img src="assets/images/logo_ui.png" alt="logo_UI" />
              <img src="assets/images/logo_itb.png" alt="logo_ITB" />
            </div>
          </div>
          <div className="pertanyaan">
            <div className="nav_soal">
              <IconContext.Provider value={{ size: 30 }}>
                <BsFillArrowLeftCircleFill
                  className="arrow"
                  style={{ display: nomer === 1 ? "none" : "" }}
                  onClick={() => setNomer(nomer - 1)}
                />
                <h4>Soal No. {nomer}</h4>
                <BsFillArrowRightCircleFill
                  className="arrow"
                  style={{ display: nomer === 30 ? "none" : "" }}
                  onClick={() => setNomer(nomer + 1)}
                />
              </IconContext.Provider>
              <br></br>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              laoreet sollicitudin metus, ac aliquet ligula porttitor sit amet.
              Nam ipsum odio, iaculis a tincidunt a, lobortis id ex. Sed vel
              turpis lobortis, semper neque vel, viverra nulla. Praesent a dui
              vehicula, consectetur felis eu, ultricies dolor. Fusce massa sem,
              ultricies vitae nunc eu, efficitur pulvinar dolor. Sed vehicula
              erat ut nunc bibendum fringilla. Nam tempor maximus elit non
              aliquet. In purus erat, ultricies et erat sit amet, porttitor
              vestibulum nisl. Praesent quis est elementum, feugiat arcu et,
              convallis odio. Nam dolor sem, convallis sed suscipit non, aliquet
              id tortor. Maecenas at lacus quis lacus tempus ultricies. Praesent
              enim diam, condimentum at elementum ut, consectetur nec nisl.
            </p>
          </div>
          <form className="form">
            <label htmlFor="A">
              <div
                className={
                  jawaban[nomer] === "A" ? "jawaban jawaban-aktif" : "jawaban"
                }
              >
                <input
                  id="A"
                  type="radio"
                  name="jawaban"
                  value="A"
                  checked={jawaban[nomer] === "A"}
                  onClick={(e) => jawabSoal(nomer, e.target.value)}
                />
                <span className="checkmark">
                  <div className="answer">A.</div>
                </span>
                <p>Jawaban A</p>
              </div>
            </label>
            <label htmlFor="B">
              <div
                className={
                  jawaban[nomer] === "B" ? "jawaban jawaban-aktif" : "jawaban"
                }
              >
                <input
                  id="B"
                  type="radio"
                  name="jawaban"
                  value="B"
                  checked={jawaban[nomer] === "B"}
                  onClick={(e) => jawabSoal(nomer, e.target.value)}
                />
                <span className="checkmark">
                  <div className="answer">B.</div>
                </span>
                <p>Jawaban B</p>
              </div>
            </label>
            <label htmlFor="C">
              <div
                className={
                  jawaban[nomer] === "C" ? "jawaban jawaban-aktif" : "jawaban"
                }
              >
                <input
                  id="C"
                  type="radio"
                  name="jawaban"
                  value="C"
                  checked={jawaban[nomer] === "C"}
                  onClick={(e) => jawabSoal(nomer, e.target.value)}
                />
                <span className="checkmark">
                  <div className="answer">C.</div>
                </span>
                <p>Jawaban C</p>
              </div>
            </label>
            <label htmlFor="D">
              <div
                className={
                  jawaban[nomer] === "D" ? "jawaban jawaban-aktif" : "jawaban"
                }
              >
                <input
                  id="D"
                  type="radio"
                  name="jawaban"
                  value="D"
                  checked={jawaban[nomer] === "D"}
                  onClick={(e) => jawabSoal(nomer, e.target.value)}
                />
                <span className="checkmark">
                  <div className="answer">D.</div>
                </span>
                <p>Jawaban D</p>
              </div>
            </label>
            <label htmlFor="E">
              <div
                className={
                  jawaban[nomer] === "E" ? "jawaban jawaban-aktif" : "jawaban"
                }
              >
                <input
                  id="E"
                  type="radio"
                  name="jawaban"
                  value="E"
                  checked={jawaban[nomer] === "E"}
                  onClick={(e) => jawabSoal(nomer, e.target.value)}
                />
                <span className="checkmark">
                  <div className="answer">E.</div>
                </span>
                <p>Jawaban E</p>
              </div>
            </label>
          </form>
          <div className="nav_soal">
            <IconContext.Provider value={{ size: 30 }}>
              <BsFillArrowLeftCircleFill
                className="arrow"
                style={{
                  display: nomer === 1 ? "none" : "",
                  color: "var(--danger)",
                }}
                onClick={() => setNomer(nomer - 1)}
              />
              <h4>{nomer}</h4>
              <BsFillArrowRightCircleFill
                className="arrow"
                style={{
                  display: nomer === 30 ? "none" : "",
                  color: "var(--succes)",
                }}
                onClick={() => setNomer(nomer + 1)}
              />
            </IconContext.Provider>
          </div>
        </div>
        {/* ---------BAGIAN UTAMA--------- */}

        {/* ----------NAVIGASI SOAL---------- */}
        <div className="navigation">
          {/* <div className="waktu">
            {waktu.menit} : {waktu.detik}
          </div> */}
          <div className="nav-button">
            {num.map((item, index) => {
              let nav = (jawaban[item] !== false) ? `${item}. ${jawaban[item]}` : `${item}. -`;
              let btn = "";
              if (item === nomer) {
                btn = "button active";
              } else if (jawaban[item] !== false) {
                btn = "button finish";
              } else {
                btn = "button";
              }
              return (
                <button
                  key={index}
                  className={btn}
                  onClick={() => numberClick(item)}
                >
                  {nav}
                </button>
              );
            })}
          </div>
          <button onClick={() => openPopup()} className="button-akhir">
            SELESAI
          </button>
        </div>
        {/* ----------NAVIGASI SOAL---------- */}
      </div>

      {/* ----------POPUP AKHIR---------- */}
      <Popup
        toggle={popup.toggle}
        message={popup.message}
        close={() => closePopup()}
        confirm={{ quiz: () => confirmQuiz(), status: popup.confirm }}
      />
      {/* ----------POPUP AKHIR---------- */}
    </div>
  );
};

// Attempt.defaultProps = {
//   soal: 30,
//   waktu: 18,
// };
export default Attempt;
