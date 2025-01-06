import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Redux/Users/userSlice";
import { useLocation } from "react-router-dom";

const Register = () => {
  const location = useLocation();
  const { tel } = location.state || {};  // Access 'tel' passed as state
  const [err, setErr] = useState("");
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const dispatch=useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const signinData = {
      name: `${input.firstName} ${input.lastName}`,
      email: input.email,
      phone: tel,  // Pass 'tel' from Signup page
      password: input.password,
    };
    console.log("Register: ", signinData);
    dispatch(registerUser(signinData));
  };

  return (
    <section className="flex flex-col items-center text-dark z-10 w-full">
      <div className="w-full h-full md:p-4 md:container flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="my-10 shadow-lg flex flex-col p-6 w-full md:w-[550px] rounded-xl text-dark"
        >
          <h1 className="text-2xl font-semibold text-center mb-6">
            Create Account
          </h1>
          {err && (
            <p className="text-base text-orange bg-orange/10 p-3 rounded-md border border-orange mb-4">
              {err}
            </p>
          )}
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="flex flex-col w-full">
              <label htmlFor="firstName" className="text-sm">
                First Name
              </label>
              <input
                id="firstName"
                value={input.firstName}
                name="firstName"
                onChange={handleChange}
                required
                className="border border-lightGray/20 px-4 py-3 text-sm text-lightGray rounded-lg mt-1 mb-4"
              />
              <label htmlFor="email" className="text-sm mt-4">
                Email
              </label>
              <input
                id="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                required
                className="border border-lightGray/20 px-4 py-3 text-sm text-lightGray rounded-lg mt-1 mb-4"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="lastName" className="text-sm">
                Last Name
              </label>
              <input
                id="lastName"
                value={input.lastName}
                name="lastName"
                onChange={handleChange}
                required
                className="border border-lightGray/20 px-4 py-3 text-sm text-lightGray rounded-lg mt-1 mb-4"
              />
              <label htmlFor="password" className="text-sm mt-4">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={input.password}
                onChange={handleChange}
                required
                className="border border-lightGray/20 px-4 py-3 text-sm text-lightGray rounded-lg mt-1 mb-4"
              />
            </div>
          </div>

          <button className="rounded-full bg-secondary text-white text-base font-semibold p-3 my-4">
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
