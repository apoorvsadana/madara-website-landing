"use client";
import React from "react";
import MadaraLogo from "../../assets/images/madara_logo.png";
import Image from "next/image";
import Link from "next/link";
import useResizeObserver from "use-resize-observer";
import { trackEvent, trackLinks } from "../analytics";

const navItems = [
  {
    text: "Architecture",
    link: "#architecture",
  },
  {
    text: "Docs",
    link: "https://docs.madara.build/",
    newTab: true,
  },
  {
    text: "Ecosystem",
    link: "#testimonials",
  },
  {
    text: "Socials",
    link: "#footer",
  },
];

const Navbar = () => {
  const scrollRef = React.useRef<number>(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();

  React.useEffect(() => {
    trackLinks("nav_link_clicked", "#nav a");
    trackLinks("footer_link_clicked", "#footer a");

    const handleScroll = () => {
      const el = document.getElementById("button-container");
      if (
        document.documentElement.scrollTop >
          document.documentElement.clientHeight &&
        el
      ) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0%)";
      } else if (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(100%)";
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  const toggleNavClick = () => {
    trackEvent("toggle_nav_view", {
      isOpen: isOpen,
    });
    if (width < 768) {
      setIsOpen((prevState) => {
        if (!prevState) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "visible";
        }
        return !prevState;
      });
    }
  };
  return (
    <div
      className="flex flex-col items-center fixed z-[100] top-0 w-full"
      ref={ref}
    >
      <nav
        id="nav"
        className="max-w-[1400px] w-full z-[100] md:grid md:grid-cols-[1fr_2fr_1fr] lg:px-32 md:px-28 sm:px-20 px-6  bg-black/90"
        style={{ backdropFilter: "blur(4px)" }}
      >
        <div className="py-4 flex justify-between items-center z-[100]">
          <div className="flex items-center">
            <Image src={MadaraLogo} alt="madara logo" />
            <h2 className="font-bold text-white">MADARA</h2>
          </div>
          <button
            onClick={toggleNavClick}
            data-collapse-toggle="navbar-default"
            type="button"
            className="flex flex-col gap-y-[6px]  md:hidden focus:bg-none"
          >
            <div
              className={`w-[25px] h-[1px] bg-white transition-transform ${
                isOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <div
              className={`w-[25px] h-[1px] bg-white ${
                isOpen ? "hidden" : "visible"
              }`}
            />
            <div
              className={`w-[25px] h-[1px] bg-white transition-transform ${
                isOpen ? "-rotate-45 translate-y-[0px]" : ""
              }`}
            />
          </button>
        </div>
        {width < 768 ? (
          <>
            <div
              className={`absolute z-[0] left-0 px-8 py-10 flex flex-col transition-opacity duration-800 bg-black h-[calc(100vh-84px)] w-full md:h-auto gap-y-10 ${
                isOpen
                  ? "opacity-1 translate-y-0"
                  : "opacity-0 translate-y-[-200%]"
              }`}
            >
              {navItems.map((item, idx) => (
                <Link
                  onClick={() => {
                    if (width < 768) {
                      toggleNavClick();
                    }
                    if (item.link.includes("#testimonials"))
                      document
                        .getElementById(item.link)
                        ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  target={item.newTab ? "_blank" : ""}
                  key={idx}
                  href={
                    item.link === "#testimonials"
                      ? "javascript:void(0);"
                      : item.link
                  }
                  className={
                    item?.className ||
                    "text-[#C0C0C0] hover:text-white text-md active:text-white"
                  }
                >
                  {item.text}
                </Link>
              ))}

              <div className="flex items-center gap-x-4 mt-auto">
                <Link
                  href="https://t.me/MadaraStarknet"
                  target="_blank"
                >
                  <button className="bg-[#BF383C] border-[1.5px] border-[#C77475] flex items-center px-5 py-2 rounded-[32px]">
                    Talk to us
                  </button>
                </Link>
                <Link
                  href="https://github.com/madara-alliance/madara/blob/main/README.md"
                  target="_blank"
                  className="text-[#FF7074] font-semibold text-lg border border-[#C77475] rounded-[32px] px-5 py-2"
                >
                  Build now
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center">
              <div
                className={`flex items-center justify-between min-w-[400px] max-w-[500px] gap-y-10`}
              >
                {navItems.map((item, idx) => (
                  <Link
                    onClick={() => {
                      toggleNavClick();
                    }}
                    target={item.newTab ? "_blank" : ""}
                    key={idx}
                    href={item.link}
                    className={
                      item?.className ||
                      "text-[#C0C0C0] hover:text-white text-md active:text-white"
                    }
                  >
                    {item.text}
                  </Link>
                ))}
              </div>
            </div>
            <div
              id="button-container"
              className="hidden md:flex items-center justify-end gap-2 transition-all opacity-0"
            >
              <Link
                href="https://github.com/madara-alliance/madara/blob/main/README.md"
                target="_blank"
                className="text-[#FF7074] font-semibold text-lg px-5"
              >
                Build now
              </Link>
              <Link
                href="https://t.me/MadaraStarknet"
                target="_blank"
              >
                <button className="bg-[#BF383C] border-[1.5px] border-[#C77475] flex items-center px-5 py-2 rounded-[32px]">
                  Talk to us
                </button>
              </Link>
            </div>
          </>
        )}
      </nav>
      <div className="h-[1px] navbar-stroke navbar-reveal-animate "></div>
    </div>
  );
};

export default Navbar;
