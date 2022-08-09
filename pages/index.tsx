import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import isUrl from "is-url";
import BeatLoader from "react-spinners/BeatLoader";

const Home: NextPage = () => {
  const [link, setLink] = useState<string>("");
  const [isValidLink, setValidLink] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    image: "",
    siteName: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setValidLink(isUrl(link));
  }, [link]);

  const onLinkChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLink(event.target.value);
  };

  const fetchLinkPreview = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const BASE_API_URL = "http://localhost:4001/api";
      const API_URL = `${BASE_API_URL}/preview?url=${link}`;
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log("Data ", data);
      setData(data);
    } catch (error) {
      console.error("Error: ", error);
    }
    setIsLoading(false);
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
        <div className="flex flex-col justify-center items-center">
          <BeatLoader color="#569CD6" loading={isLoading} />
        </div>

        {data.title && (
          <a href={link}>
            <div className="flex justify-center items-center px-5 py-6">
              <div className="max-w-sm rounded overflow-hidden shadow-lg border-4 border-indigo-500/100">
                <Image
                  className="w-full"
                  src={
                    data.image || "https://v1.tailwindcss.com/img/card-top.jpg"
                  }
                  alt="Sunset in the mountains"
                  width="600"
                  height="600"
                />

                <h3 className="px-8">{data.siteName}</h3>
                <div className="px-6 py-4 content-center">
                  <div className="font-bold text-xl mb-2">{data?.title}</div>
                  <p className="text-gray-700 text-base">{data.description}</p>
                </div>
              </div>
            </div>
          </a>
        )}

        <footer className="py-8 px-0 border-t border-solid border-[#d4d4d4]">
          <div className="flex justify-center items-center w-full">
            <a
              href="https://twitter.com/PranjalAgnihot8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <span className="relative">
                  <Image
                    src="/twitter.svg"
                    alt="Twitter Logo"
                    width={25}
                    height={25}
                  />
                </span>
                <p className="float-right">
                  <span className="pl-1">
                    {"built by "}
                    <span className="text-[#569cd6]">@beingPranjal</span>
                  </span>
                </p>
              </div>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
