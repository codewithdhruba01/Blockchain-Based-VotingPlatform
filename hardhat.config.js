import "@nomicfoundation/hardhat-toolbox";

/** @type import('hardhat/config').HardhatUserConfig */
export default {
    solidity: {
        version: "0.8.19",
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    networks: {
        hardhat: {
            chainId: 1337
        },
        localhost: {
            url: "http://127.0.0.1:8545"
        },
        // Uncomment and add your Sepolia testnet configuration
        // sepolia: {
        //   url: `https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID`,
        //   accounts: [`0x${YOUR_PRIVATE_KEY}`]
        // }
    },
    paths: {
        sources: "./contracts",
        tests: "./test",
        cache: "./cache",
        artifacts: "./artifacts"
    }
};
