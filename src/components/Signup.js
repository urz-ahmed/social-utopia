import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import app, { usersRef } from "../firebase/firebase";
import swal from "sweetalert";
import { addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
const auth = getAuth(app);
const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [OTP, setOTP] = useState("");
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          //recaptcha solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };
  const requestOtp = () => {
    setLoading(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        swal({
          text: "OTP Sent",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setOtpSent(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const verifyOTP = () => {
    try {
      setLoading(true);
      window.confirmationResult.confirm(OTP).then((result) => {
        uploadData();
        swal({
          text: "Sucessfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        navigate("/login");
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const uploadData = async () => {
    try {
      const salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(form.password, salt);
      await addDoc(usersRef, {
        name: form.name,
        mobile: form.mobile,
        password: hash,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center min-h-screen mt-16">
      <div className="h-[90%] w-full md:w-3/4 m-4">
        <h1 className="font-semibold text-2xl text-gray-400 m-8 text-center">
          Sign Up
        </h1>
        {otpSent ? (
          <div>
            <div className="flex justify-center">
              <input
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                placeholder="OTP"
                className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
              />
            </div>
            <div className="text-center mt-7">
              <button
                onClick={verifyOTP}
                className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
              >
                {loading ? <TailSpin height={25} color="white" /> : "Confirm"}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col justify-center items-center mt-10 md:mt-4 space-y-6 md:space-y-8">
              <div className="">
                <input
                  type={"text"}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter your name"
                  className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                />
              </div>
              <div className="">
                <input
                  type={"number"}
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  placeholder="Mobile No"
                  className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                />
              </div>
              <div className="">
                <input
                  type={"password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="Create new Password"
                  className=" bg-gray-100 rounded-lg px-5 py-2 focus:border border-violet-600 focus:outline-none text-black placeholder:text-gray-600 placeholder:opacity-50 font-semibold md:w-72 lg:w-[340px]"
                />
              </div>
            </div>
            <div className="text-center mt-7">
              <button
                onClick={requestOtp}
                className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
              >
                {loading ? (
                  <TailSpin height={25} color="white" />
                ) : (
                  "Request OTP"
                )}
              </button>
            </div>
          </>
        )}
        <div className="text-center my-6 flex flex-col">
          <Link
            to={"/login"}
            className="text-sm font-bold text-gray-400 hover:text-violet-500 m-1"
          >
            Already a User? Sign In
          </Link>
        </div>
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Signup;
