import React from "react";
// import Address from "./Address";
// import Balance from "./Balance";
// import Wallet from "./Wallet";

export default function Account({
  address,
  userProvider,
  localProvider,
  mainnetProvider,
  price,
  minimized,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
}) {
  const modalButtons = [];
  if (web3Modal) {
    if (web3Modal.cachedProvider) {
      modalButtons.push(
        <button
          className="mx-auto my-auto px-2"
          onClick={logoutOfWeb3Modal}
        >
          Logout
        </button>
      );
    } else {
      modalButtons.push(
        <button
          className="mx-auto my-auto px-2"
          onClick={loadWeb3Modal}
        >
          Connect
        </button>
      );
    }
  }

//   const display = minimized ? (
//     ""
//   ) : (
//     <span>
//       {address ? <Address address={address} ensProvider={mainnetProvider} blockExplorer={blockExplorer} /> : "Connecting..."}
//       <Balance address={address} provider={localProvider} price={price} />
//       <Wallet address={address} provider={userProvider} ensProvider={mainnetProvider} price={price} />
//     </span>
//   );

  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
      {modalButtons}
    </button>
  );
}