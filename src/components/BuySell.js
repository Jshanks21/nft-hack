import React, { Component } from 'react';

class BuySell extends Component {
    render() { 
        return <div className="flex flex-row justify-between space-x-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex">Buy</button>  
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex">Sell</button>    
        </div>
    }
  }

  export default BuySell