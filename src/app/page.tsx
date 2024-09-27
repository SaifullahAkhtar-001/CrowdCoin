import { Key } from "react";
import factory from "@/../ethereum/factory";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";

export default async function Home() {
  let campaigns = await factory.methods.getDeployedCampaigns().call();

  if (campaigns.length === 0) {
    campaigns.push("0x5B38Da6a", "0x5B38Da6a", "0x5B38Da6a", "0x5B38Da6a");
  }
  return (
    <div>
      <h3 className="text-xl m-4 font-bold">Open Campaigns</h3>
      <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-2">
        {campaigns.map((campaign: string[], index: Key) => (
          <Card
            key={index}
            className="bg-zinc-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 shadow-lg shadow-zinc-800 border-zinc-700"
          >
            <CardHeader>
              <CardTitle className="truncate hover:text-clip">
                {campaign}
              </CardTitle>
            </CardHeader>
            <CardFooter>
              <Link href={`/campaigns/${campaign}`} className="text-blue-500">
                View Campaign
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Link
        href="/campaigns/new"
        className="h-12 bg-zinc-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 mt-4 border-zinc-50 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 px-5"
      >
        <PlusIcon className="h-4 w-4 mr-2" /> Create Campaign
      </Link>
    </div>
  );
}
