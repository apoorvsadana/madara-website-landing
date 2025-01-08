"use client";
import {
  DotLottieCommonPlayer,
  DotLottiePlayer,
} from "@dotlottie/react-player";
import React from "react";
import useResizeObserver from "use-resize-observer";
import MobileCarousel from "../components/MobileCarousel";
import { SwiperSlide } from "swiper/react";
import { useInView, useAnimate } from "framer-motion";
import { stagger } from "framer-motion/dom";
import a1 from "../../assets/images/about/design_to_be_faster.webp";
import a2 from "../../assets/images/about/decentralised.webp";
import a3 from "../../assets/images/about/seemless_compatability.webp";
import a4 from "../../assets/images/about/batch_proof.webp";
import a5 from "../../assets/images/about/fastest_growing.webp";
import a6 from "../../assets/images/about/earn_for_every.webp";
import Image from "next/image";

const cards = [
  {
    heading: "Designed to be faster",
    description:
      "Cairo has been designed to be ZK-friendly since day one, making it faster and cheaper to prove than any alternative.",
    image: a1,
  },
  {
    heading: "Doesn't break your bank",
    description:
      "Achieve hundreds of TPS, settle within hours instead of days, and get the highest security—all without paying millions per year.",
    image: a2,
  },
  {
    heading: "Seamless composability",
    description:
      "With Stwo, Madara chains can leverage near-instant composability with the base layer and other app chains.",
    image: a3,
  },
  {
    heading: "Batch proofs across chains",
    description:
      "While Cairo is the most efficient language for proving, prover costs can still be significant. Madara chains can batch proofs together to reduce costs.",
    image: a4,
  },
  {
    heading: "Optimized for the best DX",
    description:
      "Madara is built from the ground up with diverse application needs in mind. The result is a modular design where new integrations require just a few lines of code.",
    image: a5,
  },
  {
    heading: "Fastest growing ecosystem",
    description:
      "Starknet has one of the largest ecosystems among alternatives and stands as one of the fastest-growing developer communities across all blockchains.",
    image: a6,
  },
];

const Card = ({
  item,
  shouldAutoPlay,
}: {
  item: {
    heading: string;
    description: string;
    lottie: string;
    loop?: boolean;
    image: HTMLImageElement;
  };
  shouldAutoPlay?: boolean;
}) => {
  const containerRef = React.useRef(null);
  const lottieRef = React.useRef<DotLottieCommonPlayer>(null);

  return (
    <div className="about-card opacity-0 flex h-[360px] flex-col text-left items-center rounded-2xl isolate">
      <div className="maast-border-inner overflow-hidden pt-3">
        <div className="h-[180px] flex justify-center">
          <Image
            src={item.image}
            alt={item.heading}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="p-3 pt-4 pl-4">
          <h4 className="text-xl font-medium text-white pb-4 text-left">
            {item.heading}
          </h4>
          <p className="text-base font-normal text-[#ADADAD]">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { amount: 0.2, once: true });

  React.useEffect(() => {
    if (isInView) {
      animate(
        "#about-container>.about-card",
        {
          opacity: [0, 1],
          y: ["10%", "0%"],
        },
        {
          delay: stagger(0.2),
          duration: 0.5,
        },
      );
    }
  }, [isInView]);

  const checkCursor = (e: React.MouseEvent) => {
    const elements = document.querySelectorAll(".maast-border-content");

    if (elements) {
      let a: Element[] = [];
      const items = [...elements].map((item) => [...item.children]).flat();
      items.forEach((el) => {
        const rect = el?.getBoundingClientRect() as DOMRect;

        const { left, top } = rect;

        if (left && top) {
          el?.style.setProperty(
            "--cursor-x",
            `${String(e.clientX - left ?? 0)}px`,
          );
          el?.style.setProperty(
            "--cursor-y",
            `${String(e.clientY - top ?? 0)}px`,
          );
        }
      });
    }
  };

  return (
    <section className="py-10 maast-borders" ref={ref}>
      <h1 className="heading pb-14 text-center">More than a framework</h1>
      <div
        ref={scope}
        id="about-container"
        className="grid gap-y-4 md:grid-rows-2 md:grid-cols-3 md:gap-x-8 md:gap-y-8 maast-border-content"
        onMouseMove={(e) => checkCursor(e)}
      >
        {cards.map((item, idx) => (
          <React.Fragment key={idx}>
            <Card item={item} shouldAutoPlay={width < 768} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default About;
