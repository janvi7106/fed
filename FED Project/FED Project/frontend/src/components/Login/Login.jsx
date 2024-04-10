import React, { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { userActor } from "../../states/Actors/UserActor";
const Login = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.account);
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const { password, username } = userDetails;
    let d = JSON.stringify({
      password,
      username,
    });
    console.log(d);
    const res = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: d,
    });
    const data = await res.json();
    if (data.success) {
      console.log(data);
      toast.success(data.message);
      localStorage.setItem("token", JSON.stringify(data.token));
      dispatch(userActor(data.user));
      navigate("/");
    } else {
      toast.error(data.message);
    }
  };
  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <header className="px-12 py-8">
        <div className="logo">
          <Link to="/">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaMAAA
            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" width={120} alt="" />
          </Link>
        </div>
      </header>
      <div className="bg-[#1a1919] py-10 w-full">
        <div className="bg-black py-10 text-center w-1/2 mx-auto">
          <h1 className="text-5xl my-12 font-semibold">Log in to JioSaavn</h1>
          <div className="border-b border-gray-400 w-3/4 my-4 mx-auto"></div>
          <form onSubmit={loginUser} className="text-center mx-auto w-1/2 ">
            <div className="w-full text-left py-4">
              <label
                htmlFor="username"
                className="font-semibold mb-2 inline-block"
              >
                Email or username
              </label>
              <input
                type="text"
                id="username"
                value={userDetails.username}
                onChange={onChange}
                name="username"
                placeholder="Email or username"
                className="block w-full rounded-[4px] border-0  text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white-600 outline-none p-3 hover:ring-white bg-[#1a1919]"
              />
            </div>
            <div className="w-full text-left py-4">
              <label
                htmlFor="password"
                className="font-semibold mb-2 inline-block"
              >
                Password
              </label>
              <input
                type="text"
                id="password"
                value={userDetails.password}
                onChange={onChange}
                name="password"
                placeholder="Password"
                className="block w-full rounded-[4px] border-0  text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white-600 outline-none p-3 hover:ring-white bg-[#1a1919]"
              />
            </div>
            <div className="w-full text-left py-4">
              <input
                type="submit"
                value="Log in"
                placeholder="Password"
                className="block cursor-pointer w-full outline-none bg-green-400 text-black p-3 hover:scale-105 translate-all duration-200 font-medium hover:font-semibold text-center rounded-full "
              />
            </div>
            <div className="w-full text-center py-4">
              <Link
                to="/password/forgot"
                className="text-white font-semibold underline mx-auto"
              >
                Forget Password?
              </Link>
            </div>
          </form>
          <div className="border-b border-gray-400 w-3/4 my-4 mx-auto"></div>
          <p className="pt-8">
            <span className="text-gray-300 font-semibold">
              Don't have an account?{" "}
            </span>

            <Link
              to="/signup"
              className="text-white hover:text-green-500 font-semibold underline mx-auto"
            >
              Sign up for Spotify
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
