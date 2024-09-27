import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-zinc-800 text-white m-4 flex items-center justify-between max-w-[100rem] mx-auto p-6 rounded-[.5rem]">
      <Link href="/" className="text-2xl font-bold">
        CrowdCoin
      </Link>
      <Link
        href="/campaigns/new"
        className="h-12 bg-zinc-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 mt-4 border-zinc-50 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 px-5"
      >
        <PlusIcon className="h-4 w-4 mr-2" /> Create Campaign
      </Link>
    </header>
  );
}
