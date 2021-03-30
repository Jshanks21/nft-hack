import React from "react";

export default function Account({
  account,
  web3Modal,
  connect,
  disconnect,
}) {
  const modalButtons = [];
  if (web3Modal) {
    if (web3Modal.cachedProvider) {
      modalButtons.push(
        <button
          className="mx-auto my-auto px-2"
          onClick={disconnect}
        >
          Logout
        </button>
      );
    } else {
      modalButtons.push(
        <button
          className="mx-auto my-auto px-2"
          onClick={connect}
        >
          Connect
        </button>
      );
    }
  }

  return (
    <>
    <span className="mr-5">{account ? `Account: ${account.substr(0, 6)}...` : null}</span>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
      {modalButtons}
    </button>
    </>
  );
}