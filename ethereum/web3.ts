import Web3 from "web3";

let web3: any;

declare global {
    interface Window {
      ethereum: any;
    }
  }
  

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    window.ethereum.request({ method: "eth_requestAccounts" });
    web3 = new Web3(window.ethereum);
    } else {
    const provider = new Web3.providers.HttpProvider(
        "https://sepolia.infura.io/v3/78ad770a7ded4014affaa32047c04e86"
    );
    web3 = new Web3(provider);
}

export default web3;