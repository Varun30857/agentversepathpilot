import Link from "next/link";

export default function Home() {

  return (

    <div className="flex h-screen justify-center items-center">

      <div className="text-center">

        <h1 className="text-6xl font-bold mb-6">

          PathPilot AI

        </h1>

        <p className="text-xl text-gray-400 mb-10">

          AI Powered Mock Interview Platform

        </p>

        <Link
          href="/interview"
          className="bg-violet-600 px-8 py-4 rounded-xl"
        >

          Start Interview

        </Link>

      </div>

    </div>

  );

}