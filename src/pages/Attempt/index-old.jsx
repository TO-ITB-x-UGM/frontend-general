import React, { useEffect, useState,Suspense } from "react";
import "./Attempt.css";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import Popup from "../../components/Popup";
import Tryout from "../../api/tryout";
import { useParams } from "react-router-dom";
// import LogoITB from "./Assets/logo_itb.png";
// import LogoUI from "./Assets/logo_ui.png";


function Attempt() {
  const { tryoutId, attemptId } = useParams();
  const [nomerEks,setnomerId] = useState({
    awal:1,
    akhir:1
  })
  const [nomer, setNomer] = useState(1);
  const [popup, setPopup] = useState({
    toggle: false,
    message: "",
    confirm: false,
  });
  const [questions, setQuestions] = useState({});
  const [answers, setAnswers] = useState([]);
  const [jawaban, setJawaban] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
    24: 0,
    25: 0,
    26: 0,
    27: 0,
    28: 0,
    29: 0,
    30: 0
  });

  const [waktu, setWaktu] = useState({
    menit: 0,
    detik: 0,
  });
  const [num, setNum] = useState([]);
  const [first,setFirst] = useState(0)
  const fetchData = ()=>{
    Tryout.getSubattempt(attemptId).then((result) => {
      console.log(result);
      if(result !=null){
        setWaktu({
          menit: Math.floor(result.data.data.time_remaining /60),
          detik: result.data.data.time_remaining%60
        })
      }
      console.log(result.data.data.questions.length)
      setnomerId({
        awal:result.data.data.questions[0].id,
        akhir:result.data.data.questions.length
      })
      for(let i=0;i<result.data.data.questions.length;i++){
        let soal = (result.data.data.questions[i].question_text)
        let A = (result.data.data.questions[i].option_text_1)
        let B = (result.data.data.questions[i].option_text_2)
        let C = (result.data.data.questions[i].option_text_3)
        let D = (result.data.data.questions[i].option_text_4)
        let E = (result.data.data.questions[i].option_text_5)
        let soalId = (result.data.data.questions[i].id)
        let selectedAns =(result.data.data.answers[i].selected_id)
        if(selectedAns === 1){
          selectedAns = "A"
        }else if(selectedAns === 2){
          selectedAns = "B"
        }else if(selectedAns === 3){
          selectedAns = "C"
        }else if(selectedAns === 4){
          selectedAns = "D"
        }else if(selectedAns === 5){
          selectedAns = "E"
        }
        let nums = {id:soalId,soal:soal,Ans:selectedAns,A:A,B:B,C:C,D:D,E:E}
        setJawaban((prevState) => ({ ...prevState, [i]: selectedAns }));
        let numss = num
        numss.push(nums)
        setNum(numss)

      }
    });
  }
  // ----------FUNCTION---------
  const [isLoading,setIsLoading] = useState(true)


  useEffect(() => {
    fetchData()
    localStorage.setItem("data",JSON.stringify(num))
  }, []);

  function myFunction(dataFromServer){
    var parsedJSON = JSON.parse(localStorage.getItem("data"));
    for (var i=0;i<parsedJSON.length;i++) {
      console.log(parsedJSON[i]);
    }
  }
  const [data,setData] = useState(JSON.parse(localStorage.getItem("data")))

  //console.log(num,num[nomer-1],nomer-1)
  const numberClick = (numer) => setNomer(numer);
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
    let second = 5;
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
  const SetAns = jawab =>{
    let newArr = [...data]; // copying the old datas array

    newArr[nomer].Ans = jawab; // replace e.target.value with whatever you want to change it to

    console.log( newArr[nomer].Ans,"IIIIINIIIIII",jawab)
    localStorage.setItem("data",JSON.stringify(newArr))


  }

  const jawabSoal = (nom, jawab) => {
    let ans= [{id:(nom+parseInt(nomerEks.awal)-1),selected_id:(jawab)}]
    Tryout.putAnswer(ans)
    setJawaban((prevState) => ({ ...prevState, [nomer-1]: jawab }));
    console.log(jawaban["0"])
  };

  const updateFieldChanged = e => {
    let newArr = [...num]; // copying the old datas array
    newArr[nomer].Ans = e.target.value; // replace e.target.value with whatever you want to change it to
    setNum(newArr);
  }


  // ----------FUNCTION---------

  // ----------DEBUG----------
  // console.log(popup);
  // console.log(jawaban);
  // ----------DEBUG----------

  const refresh = ()=>{
    fetchData()
    localStorage.setItem("data",JSON.stringify(num))
    setNomer(1)
    setData(JSON.parse(localStorage.getItem("data")))
  }
  return (
    <div className="Tryout_container">
      {data.length === 0 ? (
          <div>
            <p>DATA LOADING...</p>
            <button onClick={() =>refresh()}> Refresh</button>
          </div>):(
          <div>
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
                          style={{ display: nomer === nomerEks.akhir ? "none" : "" }}
                          onClick={() => setNomer(nomer + 1)}
                      />
                    </IconContext.Provider>
                    <br></br>
                  </div>
                  {data[nomer-1].soal}
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
                          value="1"
                          checked={jawaban[nomer] === "A"}
                          onClick={(e) => jawabSoal(nomer, e.target.value)}
                      />
                      <span className="checkmark">
                  <div className="answer">A.</div>
                </span>
                      { data[nomer-1].A}
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
                          value="2"
                          checked={jawaban[nomer] === "B"}
                          onClick={(e) => jawabSoal(nomer, e.target.value)}
                      />
                      <span className="checkmark">
                  <div className="answer">B.</div>
                </span>
                      { data[nomer-1].B }
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
                          value="3"
                          checked={jawaban[nomer] === "C"}
                          onClick={(e) => jawabSoal(nomer, e.target.value)}
                      />
                      <span className="checkmark">
                  <div className="answer">C.</div>
                </span>
                      { data[nomer-1].C }
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
                          value="4"
                          checked={jawaban[nomer] === "D"}
                          onClick={(e) => jawabSoal(nomer, e.target.value)}
                      />
                      <span className="checkmark">
                  <div className="answer">D.</div>
                </span>
                      { data[nomer-1].D }
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
                          value="5"
                          checked={jawaban[nomer] === "E"}
                          onClick={(e) => jawabSoal(nomer, e.target.value)}
                      />
                      <span className="checkmark">
                  <div className="answer">E.</div>
                </span>
                      { data[nomer-1].E }
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
                          display: nomer === nomerEks.akhir ? "none" : "",
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
                  {waktu.menit} : {waktu.detik}
                </div>
                <div className="nav-button">
                  {data.map((item, index) => {
                    let nav =
                        jawaban[(item.id-nomerEks.awal+1).toString()] !== 0
                            ? `${item.id-nomerEks.awal+1}. ${jawaban[(item.id-nomerEks.awal+1).toString()]}`
                            : `${item.id-nomerEks.awal+1}. -`;
                    let btn = "";
                    if (item.id-nomerEks.awal+1 === nomer) {
                      btn = "button active";
                    } else if (item.Ans === 0) {
                      btn = "button finish";
                    } else {
                      btn = "button";
                    }
                    return (
                        <button
                            key={index}
                            className={btn}
                            onClick={() => setNomer(item.id-nomerEks.awal+1)}
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
          </div>
      )}

      {/* ----------POPUP AKHIR---------- */}
    </div>
  );
};

Attempt.defaultProps = {
  soal: 25,
  waktu: 18,
};
export default Attempt;
