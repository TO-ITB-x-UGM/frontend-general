import HeaderTo from "../../components/HeaderTo";
// import "./dashboard.css"
import { SiReactos } from "react-icons/si";
import { useEffect, useState } from "react";
import Tryout from "../../api/tryout";
import Swal from "sweetalert2";
import { useHistory, useParams } from "react-router-dom";
import "./style.css";

export default function TryoutList() {
  const style = { fontSize: "3rem" };
  const [tryouts, setTryouts] = useState([]);
  const history = useHistory();
  

  useEffect(() => {
    try {
      Tryout.getAttempts().then((result) => {
        console.log(result);
        if (result.data.ok) {
          setTryouts(result.data.data);
        } else {
          console.log(result.data);
          Swal.fire({
            title: "Oops",
            icon: "error",
            text: result.data.message,
          });
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Oops",
        icon: "error",
        text: "Internal error",
      });
    }
  }, []);

  const handleStart = (tryoutId) => {
    try {
      Swal.fire({
        icon: "question",
        text: "Setelah kamu memilih tryuot ini, maka kamu tidak bisa memilih tryout lain. Waktu pengerjaan tryout hanya 5 jam.",
        title: "Konfirmasi",
        confirmButtonText: "Ya, mulai",
        showCancelButton: true,
        cancelButtonText: "Batal",
      }).then((response) => {
        if (response.isConfirmed) {
          Tryout.startAttempt(tryoutId).then((result) => {
            if (result.data.ok) {
              localStorage.setItem("attempt_id", result.data.data.attempt_id);
              history.push(`/tryout/${tryoutId}`);
            } else {
              if (result.data.message == "Time expired") {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Waktu pengerjaan sudah habis",
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: result.data.message,
                });
              }
            }
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <body>
      <HeaderTo />
      <div className="container">
        {tryouts.map((tryout) => (
          <div className="card" key={tryout.id}>
            <div className="imgBx">
              <SiReactos style={style} />
            </div>
            <div className="contentBx">
              <h2 className="nama">{tryout.title}</h2>
              <div className="size">
                <h3>{tryout.description}</h3>
              </div>
              <button
                onClick={() => {
                  handleStart(tryout.id);
                }}
              >
                Mulai Pengerjaan
              </button>
            </div>
          </div>
        ))}
      </div>
    </body>
  );
}
