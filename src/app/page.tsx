import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";
import CampaignsList from "@/components/CampaignsList";

export default function Home() {
  return (
    <div>
      <h3 className="text-xl m-4 font-bold">Open Campaigns</h3>

      {/* Render the client-side component that fetches and displays campaigns */}
      <CampaignsList />

      <Link
        href="/campaigns/new"
        className="h-12 bg-zinc-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 mt-4 border-zinc-50 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 px-5"
      >
        <PlusIcon className="h-4 w-4 mr-2" /> Create Campaign
      </Link>
    </div>
  );
}
