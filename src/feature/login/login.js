import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "./login.slice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    const cred = await axios.post("http://localhost:5006/o2authcallback", {
      body: window.location.search,
    });
    console.log(cred);
    dispatch(authActions.login({ isLoggedIn: true, userData: cred.data }));
    navigate("/events");
  };

  useEffect(() => {
    if (window.location.search.includes("?code")) {
      getData();
    }
  });

  const loginGoogle = async () => {
    const api = await axios.post("http://localhost:5006");
    window.location.replace(api.data.location);
  };
  return (
    <div>
      <button onClick={() => loginGoogle()}>Login with Google Account</button>
    </div>
  );
}

export default Login;
