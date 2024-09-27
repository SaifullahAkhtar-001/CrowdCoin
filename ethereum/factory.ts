import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x0F5C2042688eBF5c648f0e8Eea651B5351a8c685"
);

export default instance;
