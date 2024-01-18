import { useEffect, useState } from "react";
import HeaderTo from "../../components/HeaderTo";
import Tryout from "../../api/tryout";
import "./Subtest.css";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { setAnswerToken } from "../../utils/answer";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const Subtest = () => {
  const history = useHistory();
  // ----------STATE----------
  const { tryoutId } = useParams();
  // const [remaining, setRemaining] = useState(0);
  const [bab, setBab] = useState("TPS");
  const [tryout, setTryout] = useState({});
  const [sub, setSub] = useState(JSON.parse(localStorage.getItem("subtest")));
  const [subtests, setSubtests] = useState({ TPS: [], TKA: [] });
  // ----------STATE----------
  const [waktu, setWaktu] = useState(10);
  useEffect(() => {
    // exit early when we reach 0
    if (waktu <= 0) {
      Swal.fire({
        icon: "info",
        text: "Waktu pengerjaan telah habis",
        title: "Waktu Habis",
      }).then(() => {
        history.push(`/dashboard`);
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
  // -------- API ------------
  useEffect(() => {
    Tryout.getAttempt(localStorage.getItem("attempt_id")).then((result) => {
      // console.log(result);
      if (result.data.ok) {
        setTryout(result.data.data.exam);
        setSubtests({
          TPS: result.data.data.subattempts.tps,
          TKA: result.data.data.subattempts.tka,
        });
        setWaktu(result.data.data.time_remaining);
      }
    });
    // Tryout.getSubtests(tryoutId).then((result) => {
    //   if (result.data.ok) {
    //     setSubtests({
    //       TPS: result.data.data.tps,
    //       TKA: result.data.data.tka
    //     })
    //   }
    // });
  }, []);
  // -------- API ------------

  // ----------FUNCTION----------
  const handleMenu = (bab) => {
    setBab(bab);
  };

  const handleSubtestStart = (subtestId) => {
    try {
      Swal.fire({
        icon: "question",
        title: "Apakah kamu yakin?",
        text: "Kamu tidak dapat mengulangi pengerjaan subtes setelah kamu memulai",
        confirmButtonText: "Yakin",
        showCancelButton: true,
        cancelButtonText: "Batal",
      }).then((res) => {
        if (res.isConfirmed) {
          Tryout.startSubattempt(
            subtestId,
            localStorage.getItem("attempt_id")
          ).then((result) => {
            if (result.data.ok) {
              setAnswerToken(result.data.data.answer_token);
              history.push(
                `/tryout/${tryoutId}/${subtestId}/attempt/${result.data.data.subattempt_id}`
              );
            } else {
              if (result.data.message === "Time expired") {
                console.log(result.data.message);
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Waktu kamu untuk pengerjaan subtest tersebut sudah habis",
                });
              }
            }
          });
        }
      });
    } catch (error) {
      console.log(error.data);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Kamu sudah menyelesaikan subtest ini.",
      });
    }
  };

  //   useEffect(() => {
  //     let jam = waktu / 60;
  //     let menit = waktu % jam;
  //   };
  // ----------FUNCTION----------

  //   ----------DEEBUG----------
  // console.log(bab);
  // console.log(subBab);
  //   ----------DEEBUG----------

  return (
    <div className="Menu">
      <Toaster/>
      <HeaderTo />
      <div className="judul_menu">
        <div
          style={{ display: "inline-flex", justifyContent: "space-between" }}
        >
          <h1>{tryout.title}</h1>
          <h4>
            Sisa Waktu {Math.floor(waktu / 3600)} :{" "}
            {Math.floor((waktu % 3600) / 60)} : {waktu % 60}
          </h4>
        </div>
        <div className="jenis">
          <h4
            style={{
              borderBottomColor: bab === "TPS" ? "#00ca" : "#0002",
              color: bab === "TPS" ? "var(--react-dark)" : "#0005",
            }}
            onClick={() => handleMenu("TPS")}
          >
            TPS
          </h4>
          <h4
            style={{
              borderBottomColor: bab === "TKA" ? "#00ca" : "#0002",
              color: bab === "TKA" ? "var(--react-dark)" : "#0005",
            }}
            onClick={() => handleMenu("TKA")}
          >
            TL
          </h4>
        </div>
      </div>
      <div className="menu_list">
        {bab === "TPS"
          ? subtests.TPS.map((item, index) => (
              <div
                onClick={(e) => {
                  if (sub[item.subtest_id - 2] === 0) {
                    handleSubtestStart(item.subtest_id);
                  } else {
                    toast.error(
                      "Subtest ini telah kamu kerjakan! Pilih subtest lain"
                    );
                  }
                }}
                className={
                  sub[item.subtest_id - 2] === 0 ? "submenu" : "submenu2"
                }
                key={index}
              >
                <h4>{item.subtest_title}</h4>
                <p>
                  Durasi: <b>{item.subtest_duration / 60}</b> menit
                </p>
              </div>
            ))
          : subtests.TKA.map((item, index) => (
              <div
                onClick={(e) => {
                  if (sub[item.subtest_id - 2] === 0) {
                    handleSubtestStart(item.subtest_id);
                  } else {
                    toast.error(
                      "Subtest ini telah kamu kerjakan! Pilih subtest lain"
                    );
                  }
                }}
                className={
                  sub[item.subtest_id - 2] === 0 ? "submenu" : "submenu2"
                }
                key={index}
              >
                <h4>{item.subtest_title}</h4>
                <p>
                  Durasi: <b>{item.subtest_duration / 60}</b> menit
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Subtest;
