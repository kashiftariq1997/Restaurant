import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Redux/Users/userSlice";

const Login = () => {
  const navigate = useNavigate()
  const [err, setErr] = useState("");
  const [input, setInput] = useState({
    email: "",
    phone:"",
    password: "",
  });
  const dispatch=useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

     // Example validation
  if (!input.email || !input.password) {
    setErr("Email and password are required!");
    return;
  }  
    console.log("Login: ", input);
    dispatch(loginUser(input));
  };

  return (
    <section className="flex flex-col items-center text-dark z-10 min-h-[calc(100vh-340px)] w-full">
      <div className="w-full h-full md:p-4 md:container flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="my-10 shadow-lg flex flex-col p-6 w-full md:w-[360px] rounded-xl text-dark"
        >
          <h1 className="text-2xl font-semibold text-center mb-10">
            Welcome Back
          </h1>
          {err && (
            <p className="text-base text-orange bg-orange/10 p-3 rounded-md border border-orange mb-4">
              {err}
            </p>
          )}
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={input.email}
            name="email"
            onChange={handleChange}
            required
            placeholder="Email"
            className="border border-lightGray/20 px-4 py-3 text-sm text-lightGray rounded-lg mt-1"
          />
          {err && (
            <p className="text-base text-orange bg-orange/10 p-3 rounded-md border border-orange mb-4">
              {err}
            </p>
          )}
          <label htmlFor="phone" className="text-sm mt-4">
            Phone
          </label>
          <input
            id="phone"
            type="phone"
            value={input.phone}
            name="phone"
            onChange={handleChange}
            required
            placeholder="Phone"
            className="border border-lightGray/20 px-4 py-3 text-sm text-lightGray rounded-lg mt-1"
          />
          {err && <small className="text-xs text-orange mt-1">{err}</small>}
          <label htmlFor="password" className="text-sm mt-4">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="password"
            name="password"
            value={input.password}
            onChange={handleChange}
            required
            className="border border-lightGray/20 px-4 py-3 text-sm text-lightGray rounded-lg mt-1 mb-4"
          />
          <div className="flex text-xs justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                className="accent-secondary"
                checked={input.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe" className="cursor-pointer">
                Remember Me
              </label>
            </div>
            <Link
              to="/forget-password"
              className="text-primary hover:underline font-medium cursor-pointer"
            >
              Forgot Password
            </Link>
          </div>
          <button className="rounded-full bg-secondary text-white text-base font-semibold p-3 my-6">
            Login
          </button>
          <p className="text-xs text-center text-lightGray">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary cursor-pointer">
              {" "}
              Signup
            </Link>
          </p>
          <p className="text-center text-sm text-lightGray my-3">OR</p>
          <button className="rounded-full bg-transparent border border-primary text-primary text-base font-semibold p-3"
           onClick={()=>navigate('/signup')}
           >
            Login As Guest
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
