import React, { Component } from 'react';
import AnimatedCard from "@sl-codeblaster/react-3d-animated-card";

class NFTCard extends Component {
    render() { 
        return <div>


            <AnimatedCard
                config={{
                    rotation: 40, // this value for the divide (window.innerWidth / 2 - e.pageX) / rotation && (window.innerWidth / 2 - e.pageY) / rotation
                    transition:{
                        duration:0.25,
                        timingMode: "ease"
                    },
                    transform:{
                        figureIcon: {
                            rotation: 5,
                            translateZ: 100
                        },
                        titleTranslateZ: 140,
                        bodyTextTranslateZ: 100,
                        buttonTranslateZ: 80
                    }
                }}
                style={{
                    width:350 //container style (you can use className as well)
                }}
            >

                <div className="card">
                    <div className="figure">
                        <div className="figure_bg"/>
                        <img className="shadow-2xl" src={'https://lh3.googleusercontent.com/bjw4Y44BBDxfZkkTkfCBJpzLnYl0a1-CywPgIr5FbWAFiCS8_XKhMinLJqSm36NcMdCj6PeQBeyjp2w4w9rovBqhcBE03lolNNIx=s0'} alt=""/>
                    </div>
                </div>

            </AnimatedCard>



                <div className="container mx-auto">
                <h1>Title of NFT</h1>
                <h2>Symbol of NFT</h2>
                <p>Price of NFT</p>
                <p>Amount of NFT available</p>
                </div>
        </div>;
    }
  }

  export default NFTCard