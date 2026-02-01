# Deployment Guide
## Blockchain Voting Platform

This guide provides step-by-step instructions for deploying and running the Blockchain Voting Platform.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Local Development](#local-development)
4. [Testnet Deployment](#testnet-deployment)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Software
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **MetaMask** - [Install Browser Extension](https://metamask.io/)
- **Git** - [Download](https://git-scm.com/)

### Knowledge Requirements
- Basic understanding of blockchain and Ethereum
- Familiarity with command line/terminal
- Basic JavaScript/React knowledge (for frontend modifications)

---

## Installation

### Step 1: Clone or Navigate to Project

```bash
cd "/home/dhrubaraj-pati/Desktop/Blockchain Voting Platform"
```

### Step 2: Install Backend Dependencies

```bash
# Install Hardhat and smart contract dependencies
npm install
```

### Step 3: Install Frontend Dependencies

```bash
# Navigate to frontend directory
cd frontend

# Install React and Web3 dependencies
npm install

# Return to project root
cd ..
```

---

## Local Development

### Step 1: Start Local Blockchain

Open a new terminal window and run:

```bash
npx hardhat node
```

This will:
- Start a local Ethereum network on `http://127.0.0.1:8545`
- Create 20 test accounts with 10,000 ETH each
- Display account addresses and private keys

**Keep this terminal running!**

### Step 2: Deploy Smart Contract

Open a second terminal window and run:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Expected output:
```
Deploying VotingContract...
VotingContract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Contract ABI and address saved to frontend/src/contracts/VotingContract.json
Deployed by: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Admin address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

**Important:** Note the deployed contract address and admin address.

### Step 3: Configure MetaMask for Local Network

1. Open MetaMask extension
2. Click network dropdown (top center)
3. Click "Add Network" → "Add a network manually"
4. Enter network details:
   - **Network Name:** Hardhat Local
   - **RPC URL:** http://127.0.0.1:8545
   - **Chain ID:** 1337
   - **Currency Symbol:** ETH
5. Click "Save"

### Step 4: Import Test Accounts to MetaMask

From the Hardhat node terminal, copy a private key and:

1. Click MetaMask account icon
2. Select "Import Account"
3. Paste private key
4. Click "Import"

**Recommended:** Import at least 3 accounts:
- Account #0: Admin
- Account #1-2: Voters

### Step 5: Start Frontend

Open a third terminal window:

```bash
cd frontend
npm run dev
```

The application will start at `http://localhost:5173`

### Step 6: Access the Application

1. Open browser and go to `http://localhost:5173`
2. Click "Connect Wallet"
3. Approve MetaMask connection
4. You're ready to use the application!

---

## Using the Application

### As Admin (Account #0)

1. **Create Election:**
   - Go to Admin Dashboard
   - Fill in election name, start time, end time
   - Click "Create Election"
   - Approve transaction in MetaMask

2. **Add Candidates:**
   - Select the election
   - Enter candidate name and party
   - Click "Add Candidate"
   - Approve transaction

3. **Register Voters:**
   - Select the election
   - Enter voter wallet address (from MetaMask)
   - Click "Register Voter"
   - Approve transaction

### As Voter (Account #1 or #2)

1. **Switch Account in MetaMask:**
   - Click MetaMask account icon
   - Select voter account

2. **Cast Vote:**
   - Go to Voter Dashboard
   - Select active election
   - View candidates
   - Click "Vote for this candidate"
   - Approve transaction in MetaMask

3. **View Results:**
   - Go to Results page
   - Select election
   - View vote counts and winner

---

## Testnet Deployment

### Step 1: Get Testnet ETH

1. Go to [Sepolia Faucet](https://sepoliafaucet.com/)
2. Enter your MetaMask address
3. Request test ETH
4. Wait for confirmation

### Step 2: Get Infura/Alchemy API Key

**Option A: Infura**
1. Go to [Infura](https://infura.io/)
2. Sign up for free account
3. Create new project
4. Copy API key

**Option B: Alchemy**
1. Go to [Alchemy](https://www.alchemy.com/)
2. Sign up for free account
3. Create new app (Ethereum → Sepolia)
4. Copy API key

### Step 3: Configure Hardhat for Testnet

Edit `hardhat.config.js`:

```javascript
import "@nomicfoundation/hardhat-toolbox";

export default {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY`,
      accounts: [`0x${YOUR_PRIVATE_KEY}`]
    }
  }
};
```

**⚠️ Security Warning:** Never commit private keys to Git!

### Step 4: Deploy to Testnet

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

Wait for deployment (may take 1-2 minutes).

### Step 5: Update Frontend

The deployment script automatically saves the contract address to `frontend/src/contracts/VotingContract.json`.

### Step 6: Configure MetaMask for Sepolia

1. Open MetaMask
2. Click network dropdown
3. Enable "Show test networks" in settings
4. Select "Sepolia Test Network"

### Step 7: Start Frontend

```bash
cd frontend
npm run dev
```

Your application is now running on Sepolia testnet!

---

## Running Tests

### Run All Tests

```bash
npx hardhat test
```

### Run Specific Test File

```bash
npx hardhat test test/VotingContract.test.js
```

### Run Tests with Gas Report

```bash
REPORT_GAS=true npx hardhat test
```

### Expected Output

```
VotingContract
  Deployment
    ✓ Should set the correct admin
    ✓ Should initialize election count to 0
  Election Creation
    ✓ Should allow admin to create an election
    ✓ Should not allow non-admin to create an election
    ✓ Should reject election with invalid time range
  ... (20+ tests)

20 passing (2s)
```

---

## Troubleshooting

### Issue: "Cannot connect to MetaMask"

**Solution:**
- Ensure MetaMask is installed
- Check if MetaMask is unlocked
- Refresh the page
- Clear browser cache

### Issue: "Transaction failed"

**Possible Causes:**
1. **Insufficient Gas:** Increase gas limit in MetaMask
2. **Wrong Network:** Ensure MetaMask is on correct network
3. **Contract Error:** Check console for error message
4. **Nonce Issues:** Reset MetaMask account (Settings → Advanced → Reset Account)

### Issue: "Contract not found"

**Solution:**
- Verify contract is deployed: Check deployment output
- Ensure `VotingContract.json` exists in `frontend/src/contracts/`
- Restart frontend server

### Issue: "Hardhat node not responding"

**Solution:**
- Kill existing Hardhat node process
- Restart: `npx hardhat node`
- Redeploy contract

### Issue: "Module not found" errors

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# For frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Gas estimation failed"

**Possible Causes:**
1. **Not Registered:** Voter not registered for election
2. **Already Voted:** Attempting to vote twice
3. **Election Not Active:** Voting outside election period
4. **Invalid Candidate:** Candidate ID doesn't exist

**Solution:** Check error message in MetaMask for specific reason

### Issue: "Nonce too high"

**Solution:**
1. Open MetaMask
2. Go to Settings → Advanced
3. Click "Reset Account"
4. Confirm

---

## Environment Variables (Optional)

Create `.env` file in project root:

```env
# Infura/Alchemy API Key
INFURA_API_KEY=your_api_key_here

# Private Key (for deployment)
PRIVATE_KEY=your_private_key_here

# Etherscan API Key (for verification)
ETHERSCAN_API_KEY=your_etherscan_key_here
```

Update `hardhat.config.js` to use environment variables:

```javascript
import dotenv from 'dotenv';
dotenv.config();

export default {
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
};
```

---

## Verifying Contract on Etherscan

After deploying to testnet:

```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```

This makes your contract source code public and verifiable.

---

## Production Deployment Considerations

**⚠️ This project is for educational purposes. For production:**

1. **Security Audit:** Get smart contract audited by professionals
2. **Gas Optimization:** Optimize contract for minimal gas usage
3. **Mainnet Deployment:** Deploy to Ethereum mainnet (requires real ETH)
4. **Frontend Hosting:** Deploy frontend to Vercel/Netlify
5. **Domain & SSL:** Use custom domain with HTTPS
6. **Monitoring:** Set up transaction monitoring and alerts
7. **Backup:** Maintain backup of deployment keys and configurations
8. **Legal Compliance:** Ensure compliance with local regulations

---

## Useful Commands

```bash
# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Start local node
npx hardhat node

# Deploy to localhost
npx hardhat run scripts/deploy.js --network localhost

# Deploy to Sepolia
npx hardhat run scripts/deploy.js --network sepolia

# Clean artifacts
npx hardhat clean

# Start frontend
cd frontend && npm run dev

# Build frontend for production
cd frontend && npm run build
```

---

## Additional Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Web3.js Documentation](https://web3js.readthedocs.io/)
- [React Documentation](https://react.dev/)
- [MetaMask Documentation](https://docs.metamask.io/)
- [Ethereum Testnet Faucets](https://faucetlink.to/sepolia)

---

## Support

For issues or questions:
1. Check this guide's troubleshooting section
2. Review error messages in browser console
3. Check MetaMask for transaction details
4. Verify all prerequisites are installed
