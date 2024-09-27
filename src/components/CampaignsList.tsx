"use client";

import { useEffect, useState } from "react";
import factory from "@/../ethereum/factory";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Key } from "react";

const CampaignsList = () => {
  const [campaigns, setCampaigns] = useState<string[]>([]);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const fetchedCampaigns = await factory.methods
          .getDeployedCampaigns()
          .call();
        setCampaigns(fetchedCampaigns);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    }

    fetchCampaigns();
  }, []);

  return (
    <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-2">
      {campaigns.length > 0 ? (
        campaigns.map((campaign: string, index: Key) => (
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
        ))
      ) : (
        <p className="text-gray-500 m-4">No campaigns found.</p>
      )}
    </div>
  );
};

export default CampaignsList;
