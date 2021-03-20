import React, { Component } from 'react';

class Header extends Component {
    render() { 
        return <div>

        <nav className="bg-white">
            <div className="flex flex-row md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0"> 
            <h1 className="flex">Project Name</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex">Number Redeemed</button>   
            <button classname="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex">Wallet Connect</button>   
            </div>
        </nav>
        </div>
    }
  }

  export default Header