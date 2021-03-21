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
          className="ml-8 mt-4"
          onClick={logoutOfWeb3Modal}
        >
          Logout
        </button>
      );
    } else {
      modalButtons.push(
        <button
          className="ml-8 mt-4"
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
    <div>
      {modalButtons}
    </div>
  );
}