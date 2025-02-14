import React, { useContext, useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import RedAlert from "../RedAlert/RedAlert";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Register() {
  let { UserLogin, setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  let [ApiError, setApiError] = useState("");
  let [Loading, setLoading] = useState(false);

  function handleRegister(values) {
    setLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        setLoading(false);

        if (res.data.message == "success") {
          localStorage.setItem("userToken", res.data.token);
          setUserLogin(res.data.token);
          navigate("/");
          console.log(res);
        }
      })
      .catch((res) => {
        setLoading(false);
        console.log(res);
        setApiError(res.response.data.message);
      });
  }

  let validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "The minimum number of allowed characters is 3")
      .max(15, "The maximum number of allowed characters is 15")
      .required("Name is required"),
    email: yup
      .string()
      .email("The email is not valid")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password minimum length is 6")
      .required("Password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "Not matched with password")
      .required("rePassword is required"),
    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "The phone number is not valid")
      .required("Phone is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });
  return (
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-mainGreen  font-normal mb-4 text-[40px]">
        Register Now{" "}
      </h2>
      {ApiError ? (
        <div className="bg-rederror p-2 rounded mb-5">
          <span className="text-white text-[18px] font-medium">{ApiError}</span>
        </div>
      ) : null}

      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-mainGreen peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="name"
          className="left-0 top-1.5 peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75  -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-mainGreen peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter Your Name
        </label>
        {formik.errors.name && formik.touched.name ? (
          <RedAlert error={formik.errors.name} />
        ) : null}
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-mainGreen peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="email"
          className="left-0 top-1.5  peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75  -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-mainGreen peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter Your Email
        </label>
        {formik.errors.email && formik.touched.email ? (
          <RedAlert error={formik.errors.email} />
        ) : null}
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-mainGreen peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="password"
          className="left-0 top-1.5  peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75  -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-mainGreen peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter Your password
        </label>
        {formik.errors.password && formik.touched.password ? (
          <RedAlert error={formik.errors.password} />
        ) : null}
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          name="rePassword"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="rePassword"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-mainGreen peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="rePassword"
          className="left-0 top-1.5  peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-mainGreen peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter Your rePassword
        </label>
        {formik.errors.rePassword && formik.touched.rePassword ? (
          <RedAlert error={formik.errors.rePassword} />
        ) : null}
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="tel"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="phone"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-mainGreen peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="phone"
          className="left-0  peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-mainGreen peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Enter Your phone
        </label>
        {formik.errors.phone && formik.touched.phone ? (
          <RedAlert error={formik.errors.phone} />
        ) : null}
      </div>
      <div className=" flex flex-col  items-center justify-around ">
        <button
          type="submit"
          className="text-white mt-6 bg-mainGreen hover:bg-mainGreen focus:ring-4 focus:outline-none focus:ring-mainGreen font-medium rounded-lg text-sm relative w-full sm:w-auto px-5 py-2.5 text-center "
        >
          {Loading ? (
            <div className="flex items-center justify-center">
              <span className="loader"></span>{" "}
            </div>
          ) : (
            "Submit"
          )}
        </button>
        <Link to="/login">
          {" "}
          <p className=" mt-3 underline text-blue-500 font-medium text-[15px] ">
            Do you have an account ?
          </p>
        </Link>
      </div>
    </form>
  );
}
