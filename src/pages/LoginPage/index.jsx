import "./style.css";
import React, { useState } from "react";
import { useRef, useEffect } from "react";
import Background from "../../components/AnimatedBackground";
import Buttons from "../../components/NextButton";
import { Link, useHistory } from "react-router-dom";
// import * as Toast from "@radix-ui/react-toast";
// import {
//   loginWithPassword,
//   setAccessToken,
//   setUserId,
// } from "../../api/service";
import Auth from "../../api/auth";
import { setAccessToken, setUserId } from "../../utils/auth";
import Swal from "sweetalert2";
import { AiFillEye, AiFillEyeInvisible, AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const Login = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [password, setPass] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const [icon, setIcon] = useState(<AiFillEyeInvisible></AiFillEyeInvisible>);
  const [subtest, setSubtest] = useState([0, 0, 0, 0, 0, 0, 0]);
  const handleToggle = () => {
    if (showPassword === "password") {
      setIcon(<AiFillEye></AiFillEye>);
      setShowPassword("text");
    } else {
      setIcon(<AiFillEyeInvisible></AiFillEyeInvisible>);
      setShowPassword("password");
    }
  };

  // const container = useRef(null);
  //  useEffect(() => {
  //     const signUpButton = signUp.current;
  //     const signInButton = signIn.current;
  //     const containers = container.current;
  //     signUpButton.addEventListener('click', () => {
  //         containers.classList.add("right-panel-active");
  //     });
  //
  //     signInButton.addEventListener('click', () => {
  //         containers.classList.remove("right-panel-active");
  //     });
  //
  //   }, []);

  //     this.signUp = React.createRef();
  //     this.signIn = React.createRef();
  //     this.container = React.createRef();
  const LoginPass = (e) => {
    // toast.success("Kamu Salah")
    e.preventDefault();
    try {
    Auth.loginWithPassword(email, password).then((result) => {
      if (result.data.ok) {
        setAccessToken(result.data.data.access_token);
        setUserId(result.data.data);
        localStorage.setItem("subtest", JSON.stringify(subtest));
        history.push("/dashboard");
      } else {
        toast.error("kamu salah");
      }
    });
    } catch (error) {
      toast.error("Kamu Salah");
      console.log(error);
    // setOpen(true);
    // <Toast.Provider swipeDirection="up">
    //   <Toast.Root
    //     className="ToastRoot"
    //     open={open}
    //     onOpenChange={setOpen}
    //     duration={3000}
    //   >
    //     <Toast.Title className="ToastTitle">Login Error</Toast.Title>
    //     <Toast.Description asChild className="ToastDescription">
    //       Kamu salah
    //     </Toast.Description>
    //   </Toast.Root>
    // </Toast.Provider>;
    }
  };

  // const LoginPass = async (e) => {
  //   e.preventDefault();
  //   const data = {
  //     email: email,
  //     password: password,
  //   };
  //   try {
  //     const response = await axios.post(
  //       "https://tryout.hoaks.my.id/api/auth/login",
  //       data
  //     );
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <Toaster />
      <Background />
      <div className="login">
        <div class="container" id="containerLogin">
          <div class="form-container sign-in-container">
            <form onSubmit={LoginPass}>
              <h1>Sign in</h1>
              <span>use your account</span>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="password-input">
                <input
                  type={showPassword}
                  placeholder="Password"
                  onChange={(e) => setPass(e.target.value)}
                />
                <div className="eyes" onClick={handleToggle}>
                  {icon}
                </div>
              </div>
              <button type="submit">Sign In</button>
            </form>
          </div>
        </div>
        <Buttons />
      </div>
    </>
  );
};

export default Login;
