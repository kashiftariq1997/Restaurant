import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("This is err!");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Forgot Password: ", email);
  };

  return (
    <section className="flex flex-col items-center text-dark z-10 min-h-[calc(100vh-340px)] w-full">
      <div className="w-full h-full md:p-4 md:container flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="my-10 shadow-lg flex flex-col p-6 w-full md:w-[360px] rounded-xl text-dark"
        >
          <h1 className="text-2xl font-semibold text-center mb-10">
            Forgot Password
          </h1>
          <label htmlFor="email" className="text-sm">
            Email
          </label>
          <input
          id="email"
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="border border-lightGray/20 px-4 py-3 text-sm text-lightGray rounded-lg mt-1"
          />
          {err && (
            <small className="text-xs text-orange mt-1 mb-1">{err}</small>
          )}
          <button className="rounded-full bg-secondary text-white text-base font-semibold p-3 my-6">
            Next
          </button>
          <p className="text-sm text-center text-lightGray">
            Already have an account?{" "}
            <Link to="/login" className="text-primary cursor-pointer">
              {" "}
              Login
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default ForgetPassword;
