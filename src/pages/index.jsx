import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Inter } from "@next/font/google";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

const index = () => {
  return (
    <div className={`${inter.className} w-[100vw] overflow-x-hidden`}>
      <div className="fixed h-[100vh] w-[100vw] left-0 top-0 -z-50 bg-[#DDD8FE] opacity-80"></div>
      <Head>
        <title>annotater.app</title>
        <meta
          name="description"
          content="Summarize and analyze any history, english, science source for free!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Logo.png" />
      </Head>
      <div className="">
        <div className="absolute top-0 left-0 w-full h-[1300px] -z-10">
          <Image
            src="/bgImage.png"
            fill={true}
            className="opacity-80 object-cover overflow-hidden"
          />
        </div>

        <div className="flex justify-between px-6 sm:px-12 py-8 pb-6 align-middle top-0 w-full sticky z-50">
          <div className="text-2xl font-bold text-purple place-self-center sm:text-3xl sm:font-extrabold cursor-pointer">
            annotater.app
          </div>
          <div className="flex align-middle justify-center space-x-3">
            <Link
              href="./login"
              className=" my-auto mx-4 font-bold text-lg cursor-pointer hover:text-gray-600 transition-all duration-150"
            >
              login
            </Link>
            <Link
              href="./login"
              className="hidden font-extrabold text-xl cursor-pointer hover:text-gray-600 transition-all duration-150 sm:block"
            >
              <div className="bg-purple p-3 px-5 font-bold text-lg rounded-full">
                get started - it's free
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="z-20">
        <div className="flex justify-center text-5xl sm:text-7xl font-extrabold mt-6 md:mt-12">
          <div className="flex flex-col">
            <div className="text-center text-purple">annotating made</div>
            <div className="mx-auto bg-gradient-to-r leading-snug font-black bg-clip-text from-purple to-[#D2DDEE] text-purple text-center ">
              easy
            </div>
          </div>
        </div>
      </div>
      <div className="w-full text-center mt-8 text-lg">
        create <b>a free account today</b>
      </div>
      <div className="mx-auto flex justify-center m-5">
        <div className="flex sm:space-x-4 font-bold flex-col sm:flex-row">
          <Link href={"./login"}>
            <div className="bg-purple rounded-full text-lg p-3 px-6 cursor-pointer">
              sign up with google
            </div>
          </Link>
          <div className="sm:my-auto mx-auto my-2 sm:mx-2">or</div>
          <Link href={"./login"}>
            <div className="bg-[#C0E2F1] text-white text-lg rounded-full p-3 px-6 cursor-pointer mx-auto">
              sign up with email
            </div>
          </Link>
        </div>
      </div>
      <div className="w-2/3 h-[2px] bg-grey opacity-30 mx-auto"></div>
      <div className=" text-center mx-auto text-[#5A4868] font-extrabold text-3xl mt-16">
        summarize, analyze, annotate <br /> using cutting edge AI
      </div>
      <div className="mx-auto flex justify-center font-black text-4xl text-black mt-24 space-x-2 text-center px-3">
        get started in just 3 simple steps...
      </div>
      <div className=" m-12 mx-3 sm:mx-16 lg:mx-32">
        <div className="flex space-x-16">
          <div className="bg-purple h-80 w-[60vw] rounded-[2.5rem] p-12 hidden xl:block">
            <div className="bg-[#EBE8FF] w-full h-2/3 rounded-[2.5rem] text-base text-[#808080] font-extrabold p-6">
              paste your source here...
            </div>
            <div className="bg-[#EBE8FF] h-1/4 mt-6 rounded-3xl text-center grid place-content-center w-56 text-base font-bold mx-auto -mb-4">
              annotate!
            </div>
          </div>
          <div className="flex align-middle mb-6 -translate-x-10 xl:block xl:mb-0">
            <div className="text-5xl font-black mr-5 xl:mr-0">1</div>
            <div className="text-3xl font-semibold xl:mt-6">
              paste your source in the box and press <b>annotate!</b>
            </div>
          </div>
        </div>
        <div className="flex space-x-16 mt-12">
          <div className="flex align-middle mb-6 xl:block xl:mb-0 translate-x-6">
            <div className="text-5xl font-black mr-5 xl:mr-0">2</div>
            <div className="text-3xl font-semibold xl:mt-6">
              tell us a little bit more about your source
            </div>
          </div>
          <div className="bg-purple h-80 w-[50vw] rounded-[2.5rem] p-12 hidden xl:block">
            <div className="bg-[#EBE8FF] w-full h-3/4 rounded-[2.5rem] text-sm text-[#808080] font-extrabold p-6 overflow-clip">
              Tea, Silver, Opium, Iron, and Steam The 1760 British victory over
              the French in India, the subsequent growth of a British colony
              there, and the defeat of the British by their American colonists
              in the War of Independence focused British attention once again on
              Asia and trade there. Despite the mechanization of Britain's
              textile industry and the sale of vast amounts of cotton textiles
              to India, Britain still could not find any way to sell much of
              anything to the Chinese. To make matters worse, the British had
              ...
            </div>
            <div className="flex justify-around space-x-3 mx-3">
              <div className="bg-[#EBE8FF] mt-3 rounded-2xl text-center grid place-content-center text-base font-bold mx-auto p-3 px-6 flex-1">
                history
              </div>
              <div className="bg-[#EBE8FF] opacity-40 mt-3 rounded-2xl text-center grid place-content-center text-base font-bold mx-auto p-3 px-6 flex-1">
                english
              </div>
              <div className="bg-[#EBE8FF] opacity-40 mt-3 rounded-2xl text-center grid place-content-center text-base font-bold mx-auto p-3 px-6 flex-1">
                science
              </div>
            </div>
          </div>
        </div>
        <div className="flex space-x-16 mt-12 flex-col-reverse xl:flex-row">
          <div className="bg-purple h-80 w-[75vw] xl:w-[90vw] rounded-[2.5rem] p-12 xl hidden xl:block">
            <div className="flex h-full w-full">
              <div className="bg-[#EBE8FF] w-full rounded-[2.5rem] text-xs text-[#808080] font-extrabold p-6 overflow-clip">
                Tea, Silver, Opium, Iron, and Steam The 1760 British victory
                over the French in India, the subsequent growth of a British
                colony there, and the defeat of the British by their American
                colonists in the War of Independence focused British attention
                once again on Asia and trade there. Despite the mechanization of
                Britain's textile industry and the sale of vast amounts of
                cotton textiles to India, Britain still could not find any way
                to sell much of anything to the Chinese. To make matters worse,
                the British had ...
              </div>
              <div className="flex flex-col">
                <div className="bg-[#EBE8FF] m-1 mx-3 rounded-3xl p-6 text-sm font-semibold overflow-hidden text-[#808080]">
                  The British East India Company discovered that there was a
                  market for tea in England, and soon it began importing chests
                  of it back home.
                </div>
                <div className="bg-[#EBE8FF] flex-grow m-1 mx-3 rounded-3xl p-6 text-[#808080] text-sm font-semibold">
                  take your notes...
                </div>
              </div>
            </div>
          </div>
          <div className="flex align-middle mb-6 -translate-x-10 xl:block xl:mb-0">
            <div className="text-5xl font-black mr-5 xl:mr-0">3</div>
            <div className="text-3xl font-semibold xl:mt-6">
              review your annotated source, add your own notes and save it to
              your account!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
