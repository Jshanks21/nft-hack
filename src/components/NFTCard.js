import React, { Component } from 'react';

class NFTCard extends Component {
    render() { 
        return <div>
                <div className="container">
                <h1>Title of NFT</h1>
                <h2>Symbol of NFT</h2>
                <img></img>
                <p>Price of NFT</p>
                <p>Amount of NFT available</p>
                </div>
        </div>;
    }
  }

  export default NFTCard