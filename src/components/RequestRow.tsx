"use client";

import web3 from "@/../ethereum/web3";
import Campaign from "@/../ethereum/campaign";
import { useRouter } from "next/navigation";

export default function RequestRow({
  request,
  id,
  address,
  approversCount,
}: {
  request: any;
  id: number;
  address: string;
  approversCount: number;
}) {
  const router = useRouter();
  const ApproversCount = approversCount.toString();
  const readyToFinalize = parseInt(request.approvalCount) > parseInt(approversCount.toString()) / 2;
    
  async function onApprove() {
    const accounts = await web3.eth.getAccounts();
    const campaign = Campaign(address);

    await campaign.methods.approveRequest(id).send({
      from: accounts[0],
    });

    router.replace(`/campaigns/${address}/requests`);
  }

  async function onFinalize() {
    const accounts = await web3.eth.getAccounts();
    const campaign = Campaign(address);

    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0],
    });

    router.replace(`/campaigns/${address}/requests`);
  }
  return (
    <tr className={`border-b bg-zinc-800 border-zinc-700 ${request.complete ? 'opacity-50 pointer-events-none' : ''} ${ readyToFinalize  ? 'border border-green-500' : ''}`}>
      <td className="px-6 py-4">{id}</td>
      <th
        scope="row"
        className="px-6 py-4 font-medium whitespace-nowrap text-white"
      >
        {request.description}
      </th>
      <td className="px-6 py-4">
        {web3.utils.fromWei(request.value, "ether")}
      </td>
      <td className="px-6 py-4">{request.recipient}</td>
      <td className="px-6 py-4">
        {request.approvalCount}/{ApproversCount}
      </td>
      <td className="px-6 py-4">
        <button
          onClick={onApprove}
          className="font-medium bg-green-300 text-green-800 hover:bg-green-400 px-4 py-2 rounded-md"
        >
          Approve
        </button>
      </td>
      <td className="px-6 py-4">
        <button
          onClick={onFinalize}
          className="font-medium bg-blue-300 text-blue-800 hover:bg-blue-400 px-4 py-2 rounded-md"
        >
          Finallize
        </button>
      </td>
    </tr>
  );
}
