import { Arrow } from "./Arrow";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">



        <div className="flex gap-4 items-center flex-col">

          <h1 className="text-6xl bg-gradient-to-r from-fuchsia-500 to-pink-500 bg-clip-text text-transparent font-bold underline z-10">Chat-a-Site</h1>
          <p className="font-semibold text-center text-large text-gray-400  cursor-pointer">
            Just append the URL of the website you wanna talk to, to the end of this page&apos;s URL.
          </p>
          <div className="absolute top-10 right-[] opacity-30 ">
            <Arrow />
          </div>
        </div>
      </main>
    </div>
  );
}
