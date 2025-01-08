"use client";
import React from "react";
import Button from "../components/Button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="h-[500px] md:min-h-[760px] mt-[84px] md:mt-0 md:h-[calc(100vh-150px)] flex flex-col justify-center items-center overflow-hidden">
      <div className="flex flex-col items-center">
        <h1 className="text-center pb-3 heading md:pb-5 animate-[enter_0.6s_ease-in_backwards_0.4s] md:text-7xl">
          Building the
          <br />
          integrity web
        </h1>
        <h2 className="text-center text-texting-secondary pb-7 md:text-xl md:pb-12 text-sm max-w-[80%] font-normal md:max-w-[60%] animate-[enter_0.6s_ease-in_backwards_0.4s]">
          Madara is an open source stack that allows you to build app chains
          powered by Cairo and Starknet technology
        </h2>

        <div className="flex relative gap-4 md:gap-7 animate-[enter_0.6s_ease-in_backwards_0.4s] z-[2]">
          <div className="glow-circle absolute top-0 w-[100px] blur-[40px] md:w-[300px] md:blur-[60px] left-[-22%]" />
          <div className="glow-circle absolute top-0 w-[100px] blur-[40px] md:w-[300px] md:blur-[60px] right-[-22%]" />
          <Link
            className="z-[1]"
            href="https://github.com/madara-alliance/madara/blob/main/README.md"
            target="_blank"
          >
            <Button>Build now</Button>
          </Link>
          <Link
            className="z-[1]"
            href="https://forms.reform.app/starkware/sn-stack-talk-to-us-form-madara/j30jy0"
            target="_blank"
          >
            <button className="px-6 md:px-5 py-2 md:w-[150px] md:py-3 text-center text-base md:text-xl bg-white/[0.09] text-[#FEE3E3] border-2 md:border-4 border-[#f75c5c]/[0.34] rounded-xl md:rounded-xl">
              Talk to Us
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
