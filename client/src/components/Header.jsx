import React from "react";
import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
const Header = () => {
  const path = useLocation().pathname;
  return (
    <Navbar className="border-b-2 whitespace-nowrap">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-xl sm:text-3xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Alfred's
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          rightIcon={AiOutlineSearch}
          type="text"
          placeholder="Search..."
          className="hidden sm:inline"
        />
      </form>
      <Button className="w-16 h-13 sm:hidden" color="gray" pill>
        <AiOutlineSearch size={20} />
      </Button>
      <div className="flex gap-2 sm:order-2 whitespace-nowrap">
        <Button className="w-16 h-13 " color="gray" pill>
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          <Button gradientDuoTone="purpleToBlue" outline>
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle className="text-black" />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link className="text-md" to="/">
            Home
          </Link>
        </Navbar.Link>

        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link className="text-md" to="/about">
            About
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link className="text-md" to="/projects">
            Projects
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
