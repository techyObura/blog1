import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api_url from "../api";
import {
  signInFailure,
  signInSuccess,
  signInStart,
} from "../redux/slice/userSlice/userSlice";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const api = api_url;

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return dispatch(signInFailure("Please fill out all fields!"));
    }

    try {
      dispatch(signInStart());
      const signedInUser = { email, password };
      const res = await fetch(`${api}/auth/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signedInUser),
      });
      const data = await res.json();
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="md:flex-row p-3 max-w-5xl mx-auto flex flex-col md:items-center gap-6">
        {/* left side */}
        <div className="flex-1">
          <Link
            to="/"
            className="self-center whitespace-nowrap text-4xl sm:text-5xl font-bold dark:text-white"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Alfred's
            </span>
            Blog
          </Link>
          <p className="text-lg sm:text-xl font-[400] mt-5 flex flex-col gap-2">
            <span>
              {" "}
              This is Alfred's Blog Page. Get to know everything concerning
              Alfred from this site.
            </span>
            <span>
              You can sign in with your email and password or with
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-500">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-500">e</span>.
            </span>
          </p>
        </div>
        {/* right side */}

        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div className="">
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                onChange={(e) => setEmail(e.target.value.trim())}
              />
            </div>

            <div className="">
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={(e) => setPassword(e.target.value.trim())}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              className="w-full mt-4 text-lg h-[48px]"
            >
              {loading ? (
                <div className="flex justify-center items-center gap-3 ">
                  <Spinner size="md" />
                  <span className=" text-lg md:text-xl"> Loading...</span>
                </div>
              ) : (
                <>
                  <span className=" text-lg md:text-xl"> Sign In</span>
                </>
              )}
            </Button>
          </form>

          <div className="flex mt-5 gap-2 text-sm ">
            <span>Do not have an account?</span>{" "}
            <Link to={"/sign-up"} className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
