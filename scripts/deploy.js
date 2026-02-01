import hre from "hardhat";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    console.log("Deploying VotingContract...");

    // Get the contract factory
    const VotingContract = await hre.ethers.getContractFactory("VotingContract");

    // Deploy the contract
    const votingContract = await VotingContract.deploy();
    await votingContract.waitForDeployment();

    const contractAddress = await votingContract.getAddress();
    console.log("VotingContract deployed to:", contractAddress);

    // Save contract address and ABI for frontend
    const contractData = {
        address: contractAddress,
        abi: JSON.parse(votingContract.interface.formatJson())
    };

    // Create frontend config directory if it doesn't exist
    const configDir = path.join(__dirname, "../frontend/src/contracts");
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
    }

    // Write contract data to file
    fs.writeFileSync(
        path.join(configDir, "VotingContract.json"),
        JSON.stringify(contractData, null, 2)
    );

    console.log("Contract ABI and address saved to frontend/src/contracts/VotingContract.json");

    // Get deployer address
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deployed by:", deployer.address);
    console.log("Admin address:", deployer.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
