import { Footer } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

const FooterComp = () => {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          {/* Logo */}
          <div className="mt-5">
            <Link
              to="/"
              className="self-center whitespace-nowrap text-2xl sm:text-3xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Alfred's
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4 sm:justify-center">
            <div className="">
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.100jsprojects.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  100 JS Projects
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Alfred's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://www.github/techyobura.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="#" target="_blank" rel="noopener noreferrer">
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full flex flex-col sm:flex-row items-center sm:justify-between gap-2">
          <div className="">
            <Footer.Copyright
              className="sm:text-md"
              href="#"
              by="Alfred Ochieng'"
              year={new Date().getFullYear()}
            />
          </div>
          <div className="flex gap-2">
            <Footer.Icon href="#" icon={BsFacebook} className="sm:text-md" />
            <Footer.Icon href="#" icon={BsInstagram} className="sm:text-md" />
            <Footer.Icon href="#" icon={BsTwitter} className="sm:text-md" />
            <Footer.Icon href="#" icon={BsGithub} className="sm:text-md" />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComp;
