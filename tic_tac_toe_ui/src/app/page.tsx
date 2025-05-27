import dynamic from "next/dynamic";

const TicTacToeClassic = dynamic(() => import("./TicTacToeClassic"), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-2 py-10 bg-[#f5f7fa]">
      <TicTacToeClassic />
    </main>
  );
}
