import Campaign from "@/../ethereum/campaign";
import ContributionForm from "@/components/ContributionForm";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClipboardIcon, RocketIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import web3 from "@/../ethereum/web3";

export default async function page({
  params,
}: {
  params: { campaignAddress: string };
}) {
  const campaign = Campaign(params.campaignAddress);
  const sammary = await campaign.methods.getSummary().call();
  const campaignDetails = {
    address: params.campaignAddress,
    minimumContribution: sammary[0].toString(),
    balance: sammary[1].toString(),
    requestsCount: sammary[2].toString(),
    approversCount: sammary[3].toString(),
    manager: sammary[4].toString(),
  };
  console.log(campaignDetails);
  return (
    <div>
      <h1 className="text-xl m-4 font-bold">Show Campaign</h1>
      <div className="grid grid-cols-4 max-sm:grid-cols-1 gap-2">
        <Card className="bg-zinc-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 shadow-lg shadow-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="truncate hover:text-clip">
              {campaignDetails.manager}
            </CardTitle>
            <CardDescription>Address of manager</CardDescription>
          </CardHeader>
          <CardFooter>
            The manager created this campaign and can create requests to
            withdraw money
          </CardFooter>
        </Card>

        <Card className="bg-zinc-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 shadow-lg shadow-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="truncate hover:text-clip">
              {campaignDetails.minimumContribution}
            </CardTitle>
            <CardDescription>Miminum Contribution (wei)</CardDescription>
          </CardHeader>
          <CardFooter>
            You must contribute at least this much wei to become an approver
          </CardFooter>
        </Card>

        <Card className="bg-zinc-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 shadow-lg shadow-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="truncate hover:text-clip">
              {campaignDetails.requestsCount}
            </CardTitle>
            <CardDescription>Number of Requests</CardDescription>
          </CardHeader>
          <CardFooter>
            A request tries to withdraw money from the contract. Requests must
            be approved by approvers
          </CardFooter>
        </Card>

        <Card className="bg-zinc-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 shadow-lg shadow-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="truncate hover:text-clip">
              {campaignDetails.approversCount}
            </CardTitle>
            <CardDescription>Number of Approvers</CardDescription>
          </CardHeader>
          <CardFooter>
            Number of people who have already donated to this campaign
          </CardFooter>
        </Card>

        <Card className="bg-zinc-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 shadow-lg shadow-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="truncate hover:text-clip">
              {web3.utils.fromWei(campaignDetails.balance, "ether")}
            </CardTitle>
            <CardDescription>Campaign Balance (ether)</CardDescription>
          </CardHeader>
          <CardFooter>
            The balance is how much money this campaign has left to spend
          </CardFooter>
        </Card>
      </div>
      <div className="flex gap-4 items-center">
        <Link
          href={`/campaigns/${params.campaignAddress}/requests`}
          className="h-12 bg-zinc-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 mt-4 border-zinc-50 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 px-5"
        >
          <ClipboardIcon className="h-4 w-4 mr-2" /> View Requests
        </Link>
        <Dialog>
          <DialogTrigger className="h-12 bg-zinc-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 mt-4 border-zinc-50 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 px-5">
            <RocketIcon className="h-4 w-4 mr-2" />
            Contribute
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>You are Contributing</DialogTitle>
              <DialogDescription>
                Please enter the amount you would like to contribute
              </DialogDescription>
              <ContributionForm address={params.campaignAddress} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
