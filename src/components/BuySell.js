import React, { useState, useEffect } from 'react';

export default function BuySell() {

	return (
		<div className="flex flex-row justify-between space-x-4">
			<p>The bonding curve is...</p>
			<button className="font-display border-2 uppercase border-black hover:bg-black hover:text-white py-2 px-4 flex">Buy</button>
			<button disabled className="disabled:opacity-50 font-display border-2 border-black uppercase hover:bg-black hover:text-white py-2 px-4 flex">Sell</button>
		</div>
	)
}


