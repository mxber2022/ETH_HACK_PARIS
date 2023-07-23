import "./Fetch.css";
import { abi } from './abi';
import { create } from 'ipfs-http-client';
import { useEffect, useState } from "react";
import { useConnect, useAccount } from 'wagmi';
import { getPublicClient } from '@wagmi/core';
import WalletConnect from "../WalletConnect/WalletConnect";

import { prepareSendTransaction, sendTransaction } from '@wagmi/core';
import { parseEther } from 'viem';
import { writeContract } from '@wagmi/core';
import { useContractReads } from 'wagmi';
import { infuraProvider } from '@wagmi/core/providers/infura';
import { ethers } from 'ethers';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';


function Fetch () {
    
    const { connect, connectors, error, isLoading, pendingConnector, provider } = useConnect()
    const { address, isConnected } = useAccount();

    const SourceMinterContractAddressPolygon = "0xFccB23456a6D4e6279F567A4Ef445b6169223ff5";
    const DestinationMinterContractAddressAvalanche = "0xF1516575dC6d79486AD78E8c596542416F333044";

    async function mint() {
        const { hash } = await writeContract({
            address: SourceMinterContractAddressPolygon,
            abi: abi,
            functionName: "mint",
            args: ["14767482510784806043", address, 1],
        }
    );

        console.log("Transaction Hash: ", hash);

    }


    async function Photogallery () 
    {
        const client = new ApolloClient({
            uri: 'https://api.thegraph.com/subgraphs/name/mxber2022/ethglobal',
            cache: new InMemoryCache(),
        });

        client
            .query({
                query: gql`
                query {
                    approvals(first: 5) {
                      id
                      owner
                      approved
                      tokenId
                    }
                    approvalForAlls(first: 5) {
                      id
                      owner
                      operator
                      approved
                    }
                  }
                `,
            })
            .then((result) => console.log(result));

    }

    return(
        <>
        <div className="mybuttons">
           
            <h2 className="nam"> CCIP ME</h2>
            <h3 > Powered by chainlink, graph protocol and Wallet Connect</h3>
        </div>
            <div className="mybuttons">
            <WalletConnect/>
            <button className="btn" onClick={Photogallery}>NFT Minted</button>
        </div>

        <div>
            <button className="btn" onClick={mint}>Mint</button>
        </div>
    
        </>
    );
}

export default Fetch;