import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import isUrl from "is-url";
import useSWR from "swr";

const Home: NextPage = () => {
  const [link, setLink] = useState<string>("");
  const [isValidLink, setValidLink] = useState(false);

  useEffect(() => {
    setValidLink(isUrl(link));
  }, [link]);

  const onLinkChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLink(event.target.value);
  };

  const fetchLinkPreview = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    try {
      const BASE_API_URL = "http://localhost:4001/api";
      const API_URL = `${BASE_API_URL}/preview?url=${link}`;
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log("Data ", data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Link Previewer</title>
        <meta name="description" content="Let's preview your URL" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-[100vh] flex flex-col justify-between">
        <div className="px-4">
          <header className="mt-9">
            <h1 className="text-4xl text-accent text-center font-semibold md:text-[42px]">
              <Link href={"/"}>
                <a>Link Previewer</a>
              </Link>
            </h1>
          </header>
          <div className="pt-20"></div>
          <h3 className="text-lg text-center">
            A mobile-friendly link previewer
          </h3>
          <div className="mt-5 w-[98%] max-w-[40ch] mx-auto flex justify-start gap-2">
            <div className="flex-1">
              <input
                className="w-full h-full p-2 rounded bg-inherit border border-[#d4d4d4] text-inherit focus-visible:shadow-md focus-visible:shadow-[#d4d4d4] focus-visible:outline-none"
                type="text"
                placeholder="Paste link here..."
                value={link}
                onChange={onLinkChangeHandler}
              />
            </div>
            <button
              className={`button bg-accent py-2 px-3 rounded focus-visible:outline-none ${
                !isValidLink && "grayscale"
              }`}
              onClick={fetchLinkPreview}
              disabled={!isValidLink}
            >
              🔍
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="max-w-sm rounded overflow-hidden shadow-lg border-4 border-indigo-500/100">
            <Image
              className="w-full"
              src="https://v1.tailwindcss.com/img/card-top.jpg"
              alt="Sunset in the mountains"
              width="500"
              height="200"
            />

            <div className="px-6 py-4 content-center">
              <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
              <p className="text-gray-700 text-base">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptatibus quia, nulla! Maiores et perferendis eaque,
                exercitationem praesentium nihil.
              </p>
            </div>
          </div>
        </div>

        <footer className="py-8 px-0 border-t border-solid border-[#d4d4d4]">
          <div className="flex justify-center items-center w-full">
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{" "}
              <span className={styles.logo}>
                <Image
                  src="/vercel.svg"
                  alt="Vercel Logo"
                  width={72}
                  height={16}
                />
              </span>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
