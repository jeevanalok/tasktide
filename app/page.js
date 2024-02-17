// import Board from "@/components/Board";
// import LandingPage from "@/pages/Home";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <header className="w-full border border-black flex justify-between">
        <div>
          <p>image</p>
        </div>
        <div>
          <ul className="flex">
            <li>home</li>
            <li>boards</li>
          </ul>
        </div>
      </header>
      <h1 className="font-bold text-5xl">Prioritise your tasks and <br></br>Get shit done</h1>
      <h3 className="font-semibold text-md">TaskTide allows you to segment your tasks and deal with them one by one</h3>
    </main>
  );
}
