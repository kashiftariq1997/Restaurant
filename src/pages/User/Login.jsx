import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Redux/Users/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    identifier: "", // Single field for email/phone
    password: "",
    rememberMe: false,
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.identifier || !input.password) {
      toast.error("Identifier and password are required!");
      return;
    }

    dispatch(loginUser({ identifier: input.identifier, password: input.password })).then((action) => {
      if (loginUser.fulfilled.match(action)) {
        navigate("/home");
      } else if (loginUser.rejected.match(action)) {
        toast.error(action.payload || "Login failed. Please try again.");
      }
    });
  };

  return (
    <section className="flex flex-col items-center text-dark z-10 min-h-[calc(100vh-340px)] w-full">
      <div className="w-full h-full md:p-4 md:container flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="my-10 shadow-lg flex flex-col p-6 w-full md:w-[360px] rounded-xl text-dark"
        >
          <h1 className="text-2xl font-semibold text-center mb-10">Welcome Back</h1>
          <label htmlFor="identifier" className="text-sm">
            Email or Phone
          </label>
          <input
            id="identifier"
            type="text"
            value={input.identifier}
            name="identifier"
            onChange={handleChange}
            required
            placeholder="Email or Phone"
            className="border border-lightGray/20 px-4 py-3 text-sm text-lightGray rounded-lg mt-1"
          />
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
              <label htmlFor="rememberMe" className="cursor-pointer">Remember Me</label>
            </div>
            <Link
              to="/forget-password"
              className="text-primary hover:underline font-medium cursor-pointer"
            >
              Forgot Password
            </Link>
          </div>
          <button className="rounded-full bg-secondary text-white text-base font-semibold p-3 my-6">Login</button>
          <p className="text-xs text-center text-lightGray">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary cursor-pointer">Signup</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
