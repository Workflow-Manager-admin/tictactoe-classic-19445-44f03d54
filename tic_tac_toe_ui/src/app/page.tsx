import dynamic from "next/dynamic";

// Use the TypeScript/TSX version of the component for compatibility.
const TicTacToeClassic = dynamic(() => import("./TicTacToeClassic"), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-2 py-10 bg-[#f5f7fa]">
      <TicTacToeClassic />
    </main>
  );
}
