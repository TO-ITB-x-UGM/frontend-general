import React, { useEffect, useState } from "react";
import "./Attempt.css";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
  BsSquare,
  BsSlashSquare,
} from "react-icons/bs";
import { IconContext } from "react-icons";
// import Popup from "../../components/Popup";
import Tryout from "../../api/tryout";
import { useHistory, useParams } from "react-router-dom";
import parse from "html-react-parser";
import Swal from "sweetalert2";
// import LogoITB from "./Assets/logo_itb.png";
// import LogoUI from "./Assets/logo_ui.png";

function Attempt(props) {
  const history = useHistory();

  const [isDoubt, setIsDoubt] = useState(false);
  const { tryoutId, subtestId, attemptId } = useParams();
  const [nomer, setNomer] = useState(1);
  const [nomerEks, setnomerId] = useState({
    awal: 1,
    akhir: 1,
  });
  const [jumlahsoal, setJumlahsoal] = useState(0);
  // const [popup, setPopup] = useState({
  //     toggle: false,
  //     message: "",
  //     confirm: false,
  // });
  // const [questions, setQuestions] = useState({});
  // const [answers, setAnswers] = useState([]);
  const [num, setNum] = useState([]);
  const [jawaban, setJawaban] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false,
    18: false,
    19: false,
    20: false,
    21: false,
    22: false,
    23: false,
    24: false,
    25: false,
    26: false,
    27: false,
    28: false,
    29: false,
    30: false,
  });
  //console.log(jawaban)
  const [waktu, setWaktu] = useState(10);
  useEffect(() => {
    // exit early when we reach 0
    if (waktu <= 0) {
      Swal.fire({
        icon: "info",
        text: "Waktu pengerjaan telah habis",
        title: "Waktu Habis",
      }).then(() => {
        history.push(`/tryout/${tryoutId}`);
        const subTemp = JSON.parse(localStorage.getItem("subtest"));
        console.log(subTemp);
        console.log(subtestId);
        subTemp[subtestId - 2] = 1;
        localStorage.setItem("subtest", JSON.stringify(subTemp));
      });
    }

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setWaktu(waktu - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [waktu]);
  // ----------FUNCTION---------
  const fetchData = () => {
    Tryout.getSubattempt(attemptId).then((result) => {
      console.log(result);
      if (result != null) {
        setWaktu(result.data.data.time_remaining);
      }
      console.log(result.data.data.questions.length);
      setnomerId({
        awal: result.data.data.questions[0].id,
        akhir: result.data.data.questions.length,
      });
      setJumlahsoal(result.data.data.questions.length);
      for (let i = 0; i < result.data.data.questions.length; i++) {
        let soal = result.data.data.questions[i].question_text;
        let soalId = result.data.data.questions[i].id;
        let selectedAns = result.data.data.answers[i].selected_id;
        if (result.data.data.questions[i].option_text_1) {
          let A = result.data.data.questions[i].option_text_1;
          let B = result.data.data.questions[i].option_text_2;
          let C = result.data.data.questions[i].option_text_3;
          let D = result.data.data.questions[i].option_text_4;
          let E = result.data.data.questions[i].option_text_5;
          if (selectedAns === "1") {
            selectedAns = "A";
          } else if (selectedAns === "2") {
            selectedAns = "B";
          } else if (selectedAns === "3") {
            selectedAns = "C";
          } else if (selectedAns === "4") {
            selectedAns = "D";
          } else if (selectedAns === "5") {
            selectedAns = "E";
          }
          let nums = {
            id: soalId,
            soal: soal,
            Ans: selectedAns,
            A: A,
            B: B,
            C: C,
            D: D,
            E: E,
          };
          setJawaban((prevState) => ({ ...prevState, [i + 1]: selectedAns }));
          let numss = num;
          numss.push(nums);
          setNum(numss);
        } else {
          let nums = {
            id: soalId,
            soal: soal,
            Ans: selectedAns,
            A: null,
            B: null,
            C: null,
            D: null,
            E: null,
          };
          setJawaban((prevState) => ({ ...prevState, [i + 1]: selectedAns }));
          let numss = num;
          numss.push(nums);
          setNum(numss);
        }
      }
    });
  };
  useEffect(() => {
    fetchData();
    localStorage.setItem("data", JSON.stringify(num));
  }, []);
  const [data, setData] = useState([]);

  const openPopup = () => {
    Swal.fire({
      icon: "warning",
      text: "Apakah anda yakin ingin mengakhiri pengerjaan subtest ini?",
      title: "Konfirmasi",
      showCancelButton: true,
      cancelButtonText: "Batal",
    }).then((response) => {
      if (response.isConfirmed) {
        try {
          Tryout.finishSubattempt(attemptId).then((result) => {
            if (result.data.ok) {
              Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: "Pengerjaan berhasil diakhiri. Kamu akan dialihkan ke halaman subtes",
              }).then(() => {
                history.push(`/tryout/${tryoutId}`);
                const subTemp = JSON.parse(localStorage.getItem("subtest"));
                console.log(subTemp);
                console.log(subtestId);
                subTemp[subtestId - 2] = 1;
                localStorage.setItem("subtest", JSON.stringify(subTemp));
              });
            } else {
              console.log(result.data);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: result.data.message,
              });
            }
          });
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Internal error",
          });
        }
      }
    });
    // setPopup((prevState) => ({
    //     ...prevState,
    //     toggle: true,
    //     message: "Yakin ingin mengakhiri ujian ini ?",
    // }));
  };
  // const closePopup = () => {
  //     setPopup({ confirm: false, toggle: false, message: "" });
  // };
  // const confirmQuiz = () => {
  //     let second = 5;
  //     let myInterval = setInterval(() => {
  //         if (second > 0) {
  //             let msg = "Ujian akan tertutup otomatis dalam " + second + " detik !";
  //             setPopup((prevState) => ({
  //                 ...prevState,
  //                 message: msg,
  //             }));
  //             second -= 1;
  //         } else {
  //             setPopup((prevState) => ({
  //                 ...prevState,
  //                 toggle: false,
  //                 confirm: true,
  //             }));
  //             clearInterval(myInterval);
  //         }
  //     }, 1000);
  // };

  const jawabSoal = (nom, jawab, tipe) => {
    let ansTmp = 0;
    if (tipe === 0) {
      if (jawab === "A") {
        ansTmp = 1;
      } else if (jawab === "B") {
        ansTmp = 2;
      } else if (jawab === "C") {
        ansTmp = 3;
      } else if (jawab === "D") {
        ansTmp = 4;
      } else if (jawab === "E") {
        ansTmp = 5;
      }
      let ans = [
        { id: nom + parseInt(nomerEks.awal) - 1, selected_id: ansTmp },
      ];
      console.log(ans);
      Tryout.putAnswer(ans);
      setJawaban((prevState) => ({ ...prevState, [nomer]: jawab }));
    } else {
      let ans = [{ id: nom + parseInt(nomerEks.awal) - 1, selected_id: jawab }];
      console.log(ans);
      Tryout.putAnswer(ans);
      setJawaban((prevState) => ({ ...prevState, [nomer]: jawab }));
    }
  };

  // ----------FUNCTION---------

  // ----------DEBUG----------
  // console.log(popup);
  // console.log(jawaban);
  // ----------DEBUG----------
  const refresh = () => {
    fetchData();
    localStorage.setItem("data", JSON.stringify(num));
    setNomer(1);
    setData(JSON.parse(localStorage.getItem("data")));
  };
  return (
    <div className="Tryout_container">
      {data.length === 0 ? (
        <div>
          <p>DATA LOADING...</p>
          <button onClick={() => refresh()}> Refresh</button>
        </div>
      ) : (
        <div>
          {/* <div style={{ display: popup.confirm ? "" : "none" }}>
                        <h1>QUIZ SELESAI</h1>
                    </div> */}
          {/* <div
                        className="main"
                        style={{
                            filter: popup.toggle ? "blur(20px)" : "",
                            display: popup.confirm ? "none" : "",
                        }}
                    > */}
          <div className="main">
            {/* ---------BAGIAN UTAMA--------- */}
            <div className="soal">
              <div className="judul">
                <h4>
                  <b className="judul_to">TO</b>
                  <b className="judul_to_2">ITBxUGM</b>
                </h4>
                <div>
                  <img src="assets/images/logo_itb.png" alt="logo_ITB" />
                  <img src="assets/images/logo_ugm.png" alt="logo_UGM" />
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
                      style={{ display: nomer === jumlahsoal ? "none" : "" }}
                      onClick={() => setNomer(nomer + 1)}
                    />
                  </IconContext.Provider>
                  <br></br>
                </div>

                {parse(data[nomer - 1].soal)}
              </div>
              {data[nomer - 1].A ? (
                <form className="form">
                  <label htmlFor="A">
                    <div
                      className={
                        jawaban[nomer] === "A"
                          ? "jawaban jawaban-aktif"
                          : "jawaban"
                      }
                    >
                      <input
                        id="A"
                        type="radio"
                        name="jawaban"
                        value="A"
                        checked={jawaban[nomer] === "A"}
                        onClick={(e) => jawabSoal(nomer, e.target.value, 0)}
                      />
                      <span className="checkmark">
                        <div className="answer">A.</div>
                      </span>
                      <p>{parse(data[nomer - 1].A)}</p>
                    </div>
                  </label>
                  <label htmlFor="B">
                    <div
                      className={
                        jawaban[nomer] === "B"
                          ? "jawaban jawaban-aktif"
                          : "jawaban"
                      }
                    >
                      <input
                        id="B"
                        type="radio"
                        name="jawaban"
                        value="B"
                        checked={jawaban[nomer] === "B"}
                        onClick={(e) => jawabSoal(nomer, e.target.value, 0)}
                      />
                      <span className="checkmark">
                        <div className="answer">B.</div>
                      </span>
                      <p>{parse(data[nomer - 1].B)}</p>
                    </div>
                  </label>
                  <label htmlFor="C">
                    <div
                      className={
                        jawaban[nomer] === "C"
                          ? "jawaban jawaban-aktif"
                          : "jawaban"
                      }
                    >
                      <input
                        id="C"
                        type="radio"
                        name="jawaban"
                        value="C"
                        checked={jawaban[nomer] === "C"}
                        onClick={(e) => jawabSoal(nomer, e.target.value, 0)}
                      />
                      <span className="checkmark">
                        <div className="answer">C.</div>
                      </span>
                      <p>{parse(data[nomer - 1].C)}</p>
                    </div>
                  </label>
                  <label htmlFor="D">
                    <div
                      className={
                        jawaban[nomer] === "D"
                          ? "jawaban jawaban-aktif"
                          : "jawaban"
                      }
                    >
                      <input
                        id="D"
                        type="radio"
                        name="jawaban"
                        value="D"
                        checked={jawaban[nomer] === "D"}
                        onClick={(e) => jawabSoal(nomer, e.target.value, 0)}
                      />
                      <span className="checkmark">
                        <div className="answer">D.</div>
                      </span>
                      <p>{parse(data[nomer - 1].D)}</p>
                    </div>
                  </label>
                  <label htmlFor="E">
                    <div
                      className={
                        jawaban[nomer] === "E"
                          ? "jawaban jawaban-aktif"
                          : "jawaban"
                      }
                    >
                      <input
                        id="E"
                        type="radio"
                        name="jawaban"
                        value="E"
                        checked={jawaban[nomer] === "E"}
                        onClick={(e) => jawabSoal(nomer, e.target.value, 0)}
                      />
                      <span className="checkmark">
                        <div className="answer">E.</div>
                      </span>
                      <p>{parse(data[nomer - 1].E)}</p>
                    </div>
                  </label>
                </form>
              ) : (
                <form className="form">
                  <div className="jawaban-isian">
                    Jawaban:
                    <input
                      type="text"
                      id="shortAnswer"
                      name="shortAnswer"
                      value={jawaban[nomer] === "0" ? "" : jawaban[nomer]}
                      onChange={(e) => jawabSoal(nomer, e.target.value, 1)}
                      placeholder="Masukkan jawaban Anda..."
                    />
                  </div>
                </form>
              )}
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
                      display: nomer === jumlahsoal ? "none" : "",
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
              <div className="waktu">
                {Math.floor(waktu / 60)} : {waktu % 60}
              </div>
              <div className="nav-button">
                {data.map((item, index) => {
                  let items = item.id - nomerEks.awal + 1;
                  let nav =
                    jawaban[items].length > 3
                      ? `${items}. ${jawaban[items].substring(0, 3)}`
                      : `${items}. ${jawaban[items]}`;
                  let btn = "";
                  if (items === nomer) {
                    btn = "button";
                  } else if (
                    jawaban[items] === false ||
                    jawaban[items] === "0"
                  ) {
                    btn = "button active";
                  } else {
                    btn = "button finish";
                  }
                  return (
                    <button
                      key={index}
                      className={btn}
                      onClick={() => setNomer(items)}
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
          {/* <Popup
                        toggle={popup.toggle}
                        message={popup.message}
                        close={() => closePopup()}
                        confirm={{ quiz: () => confirmQuiz(), status: popup.confirm }}
                    /> */}
          {/* ----------POPUP AKHIR---------- */}
        </div>
      )}
    </div>
  );
}

Attempt.defaultProps = {
  soal: 30,
  waktu: 18,
};
export default Attempt;
