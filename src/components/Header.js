import React, { Component } from 'react';

class Header extends Component {
    render() { 
        return <div>

        <nav className="bg-white">
            <div className="md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0"> 
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Number Redeemed</button>   
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Wallet Connect</button>   
            </div>
        </nav>
        </div>
    }
  }

  export default Header