// import Board from "@/components/Board";
// import LandingPage from "@/pages/Home";
import logo from "@/assets/logo.png";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <header className="w-full flex justify-between h-[4rem] mb-10">
        <div>
          <Image src={logo} width={80} height={40}></Image>
        </div>
        <div></div>
      </header>
      <h1 className="font-bold text-8xl">
        Prioritise Your <span className="text-primary">Tasks</span> <br></br>Get
        shit <span className="text-primary">Done</span>
      </h1>
      <h2 className="font-semibold text-xl text-rose-300 mt-10">
        TaskTide allows you to segment your tasks and deal with them one by one
      </h2>
      <p className="text-violet-400 font-medium text-xl mb-10 mt-3">
        Try the demo now and join the waiting list
      </p>
      <button class="button-89" role="button" className="button-89 w-[20rem]">
        <Link href={"/boards"}>
          <p className="text-2xl">Get Started Now</p>
        </Link>
      </button>
    </main>
  );
}
