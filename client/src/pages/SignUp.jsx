import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
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
              You can sign up with your email and password or with{" "}
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
          <form>
            <div className="">
              <Label value="Your username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>

            <div className="">
              <Label value="Your email" />
              <TextInput type="email" placeholder="Email" id="email" />
            </div>

            <div className="">
              <Label value="Your Password" />
              <TextInput type="password" placeholder="Password" id="password" />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              className="w-full mt-4 text-lg"
            >
              Sign Up
            </Button>
          </form>

          <div className="flex mt-5 gap-2 text-sm ">
            <span>Have an account?</span>{" "}
            <Link to={"/sign-in"} className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
