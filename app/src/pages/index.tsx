import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useDonate } from "app/hook/use-donate";

export default function Home() {
  const { donate, data, error, isSuccess } = useDonate();

  function handleDonate() {
    donate(BigInt(1));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ConnectButton />

      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold">Impact Manager</h1>
        <p className="text-lg text-center">
          Donate to projects that make a difference.
        </p>
        <button
          className="mt-8 px-8 py-4 bg-blue-500 text-white rounded-lg"
          onClick={handleDonate}
        >
          Donate
        </button>
      </div>
    </main>
  );
}
