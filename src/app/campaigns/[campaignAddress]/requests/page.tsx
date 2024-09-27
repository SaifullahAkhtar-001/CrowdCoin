import RequestForm from "@/components/RequestForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RocketIcon } from "@radix-ui/react-icons";
import Campaign from "@/../ethereum/campaign";
import RequestRow from "@/components/RequestRow";
import BackButton from "@/components/ui/BackButton";

export default async function page({
  params,
}: {
  params: { campaignAddress: string };
}) {
  const campaign = Campaign(params.campaignAddress);
  const requestCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const rawRequests = await Promise.all(
    Array(parseInt(requestCount))
      .fill(undefined)
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  const requests = rawRequests.map((request) => {
    return {
      description: request.description.toString(),
      value: request.value.toString(),
      recipient: request.recipient.toString(),
      approvalCount: request.approvalCount.toString(),
      complete: request.complete,
    };
  });

  console.log(requests);
  return (
    <div className="flex flex-col gap-4">
      <BackButton />
      <div className="flex justify-between items-center px-4">
        <h3 className="text-xl m-4 font-bold">Request</h3>
        <Dialog>
          <DialogTrigger className="h-12 bg-zinc-200 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 mt-4 border-zinc-50 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 px-5">
            <RocketIcon className="h-4 w-4 mr-2" />
            Create Request
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>You are Contributing</DialogTitle>
              <DialogDescription>
                Please enter the amount you would like to contribute
              </DialogDescription>
              <RequestForm address={params.campaignAddress} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right ">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right  text-white bg-zinc-800">
            All Request
            <p className="mt-1 text-sm font-normal text-zinc-400">
              List of all requests for this campaign address{" "}
              {params.campaignAddress}
            </p>
          </caption>
          <thead className="text-xs uppercase bg-zinc-700 text-zinc-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Recipient
              </th>
              <th scope="col" className="px-6 py-3">
                Approval Count
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <RequestRow
                key={index}
                request={request}
                id={index}
                address={params.campaignAddress}
                approversCount={approversCount}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="pl-4">Found {parseInt(requestCount)} requests.</div>
    </div>
  );
}
