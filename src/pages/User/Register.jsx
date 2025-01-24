import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Redux/Users/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [err, setErr] = useState("");
  const [input, setInput] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check for at least one of email or phone
    if (!input.email && !input.phone) {
      toast.error("Please provide either an email or phone number.");
      return;
    }
  
    const signinData = {
      name: input.name,
      email: input.email || null,
      phone: input.phone || null,
      password: input.password,
    };
  
    try {
      const result = await dispatch(registerUser(signinData)).unwrap();
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      if (error.includes("phone")) {
        toast.error("User with this phone number already exists!");
      } else if (error.includes("email")) {
        toast.error("User with this email already exists!");
      } else {
        toast.error(error || "Registration failed. Please try again.");
      }
    }
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
              <label htmlFor="name" className="text-sm">
                Name
              </label>
              <input
                id="name"
                value={input.name}
                name="name"
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
                className="border border-lightGray/20 px-4 py-3 text-sm text-lightGray rounded-lg mt-1 mb-4"
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="phone" className="text-sm">
                Phone
              </label>
              <input
                id="phone"
                value={input.phone}
                name="phone"
                onChange={handleChange}
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
