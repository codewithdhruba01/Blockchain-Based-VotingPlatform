# 🗳️ Blockchain Voting Platform

A decentralized voting platform built on Ethereum blockchain for conducting secure, transparent, and tamper-proof elections.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Solidity](https://img.shields.io/badge/Solidity-0.8.19-green.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Hardhat](https://img.shields.io/badge/Hardhat-2.19.0-yellow.svg)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

This project implements a blockchain-based voting system that ensures:
- **Security:** Cryptographic protection against tampering
- **Transparency:** All votes publicly verifiable on blockchain
- **Immutability:** Votes cannot be altered once cast
- **Accessibility:** Vote from anywhere with internet connection
- **Privacy:** Wallet-based authentication protects voter identity

Perfect for:
- Student elections
- Organization voting
- Community polls
- DAO governance
- Final year projects

---

## ✨ Features

### Smart Contract
- ✅ Create and manage multiple elections
- ✅ Add candidates with party affiliations
- ✅ Register eligible voters by wallet address
- ✅ Time-based election control (start/end times)
- ✅ Prevent double voting
- ✅ Automatic winner calculation
- ✅ Comprehensive event logging

### Frontend
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ MetaMask wallet integration
- ✅ Real-time vote counting
- ✅ Admin dashboard for election management
- ✅ Voter dashboard for casting votes
- ✅ Results page with winner display
- ✅ Election history and audit trail
- ✅ Transaction status notifications

### Security
- ✅ Access control modifiers
- ✅ Input validation
- ✅ Reentrancy protection
- ✅ Integer overflow protection (Solidity 0.8+)
- ✅ Time-based restrictions

---

## 🛠️ Tech Stack

### Blockchain
- **Solidity** - Smart contract development
- **Hardhat** - Development environment
- **Ethereum** - Blockchain platform
- **Web3.js** - Blockchain interaction

### Frontend
- **React.js** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation

### Tools
- **MetaMask** - Wallet authentication
- **Chai & Mocha** - Testing
- **Node.js** - Runtime environment

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         React Frontend (Vite)           │
│  Home | Admin | Voter | Results | Hist  │
└──────────────────┬──────────────────────┘
                   │ Web3.js
┌──────────────────▼──────────────────────┐
│          MetaMask Wallet                 │
│     Authentication & Signing             │
└──────────────────┬──────────────────────┘
                   │ JSON-RPC
┌──────────────────▼──────────────────────┐
│       Ethereum Blockchain                │
│  ┌────────────────────────────────────┐ │
│  │    VotingContract.sol              │ │
│  │  • Election Management             │ │
│  │  • Candidate Management            │ │
│  │  • Voter Management                │ │
│  │  • Vote Casting & Counting         │ │
│  └────────────────────────────────────┘ │
└──────────────────────────────────────────┘
```

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher) - [Download](https://nodejs.org/)
- npm (comes with Node.js)
- MetaMask Browser Extension - [Install](https://metamask.io/)

### Step-by-Step Setup

#### Step 1: Install Dependencies

```bash
# Navigate to project root directory
cd "/home/dhrubaraj-pati/Desktop/Blockchain Voting Platform"

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install Tailwind CSS (if not already installed)
npm install -D tailwindcss postcss autoprefixer

# Return to root directory
cd ..
```

#### Step 2: Start Local Blockchain

**Open Terminal 1:**
```bash
# Start local Hardhat network
npm run node

# OR
npx hardhat node
```

This command will start a local Ethereum network:
- URL: `http://127.0.0.1:8545`
- Chain ID: `1337`
- Creates 20 test accounts, each with 10,000 ETH
- Displays account addresses and private keys

**⚠️ Important: Keep this terminal running!**

#### Step 3: Deploy Smart Contract

**Open Terminal 2:**
```bash
# Deploy contract to local network
npm run deploy:local

# OR
npx hardhat run scripts/deploy.js --network localhost
```

**Expected Output:**
```
Deploying VotingContract...
VotingContract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Contract ABI and address saved to frontend/src/contracts/VotingContract.json
Deployed by: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

**📝 Note:** Save the contract address and admin address.

#### Step 4: Configure MetaMask

1. **Open MetaMask Extension**
2. **Click network dropdown** (top center)
3. **Click "Add Network" → "Add a network manually"**
4. **Enter network details:**
   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `1337`
   - Currency Symbol: `ETH`
5. **Click "Save"**

#### Step 5: Import Test Accounts to MetaMask

From Terminal 1 (where `hardhat node` is running):

1. **Copy any private key** (Account #0, #1, #2)
2. **In MetaMask:**
   - Click account icon
   - Select "Import Account"
   - Paste private key
   - Click "Import"

**Recommended:** Import at least 3 accounts:
- **Account #0:** For Admin
- **Account #1-2:** For Voters

#### Step 6: Start Frontend

**Open Terminal 3:**
```bash
# Navigate to frontend directory
cd frontend

# Start development server
npm run dev
```

**Output:**
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

#### Step 7: Open Application

1. **Open browser** and go to: `http://localhost:5173`
2. **Click "Connect Wallet" button**
3. **Approve connection in MetaMask**
4. **You're ready! 🎉**

---

## 🚀 How to Use

### As Admin (Account #0)

#### 1. Create Election
- Navigate to **Admin Dashboard**
- Enter election name (e.g., "Student Council Election 2026")
- Select start time and end time
- Click **"Create Election"**
- Approve transaction in MetaMask

#### 2. Add Candidates
- Select the election
- Enter candidate name and party
- Click **"Add Candidate"**
- Approve transaction
- Add 3-4 candidates

#### 3. Register Voters
- Select the election
- Paste voter's wallet address (from MetaMask)
- Click **"Register Voter"**
- Approve transaction

### As Voter (Account #1 or #2)

#### 1. Switch Account in MetaMask
- Click MetaMask account icon
- Select voter account (that is registered)

#### 2. Cast Vote
- Navigate to **Voter Dashboard**
- Select active election
- View candidates
- Click **"Vote"** button for your preferred candidate
- Approve transaction in MetaMask
- ✅ Success message will appear!

#### 3. View Results
- Navigate to **Results** page
- Select election
- View vote counts and winner
- Real-time results!

---

## 🧪 Testing

### Run Smart Contract Tests

```bash
# In root directory
npm test

# OR
npx hardhat test
```

**Expected Output:**
```
  VotingContract
    Deployment
      ✓ Should set the correct admin
      ✓ Should initialize election count to 0
    Election Creation
      ✓ Should allow admin to create an election
      ✓ Should not allow non-admin to create election
    ... (20+ tests)

  20 passing (2s)
```

---

## 📝 Available Commands

### Backend (from Root Directory)
```bash
npm run node          # Start local blockchain
npm run compile       # Compile smart contracts
npm test              # Run tests
npm run deploy:local  # Deploy to local network
npm run clean         # Clean build artifacts
```

### Frontend (from frontend/ Directory)
```bash
npm run dev           # Start development server
npm run build         # Build for production
npm run preview       # Preview production build
```

---

## 🔧 Troubleshooting

### Issue: "Cannot connect to MetaMask"
**Solution:**
- Ensure MetaMask is installed and unlocked
- Refresh the page
- Clear browser cache

### Issue: "Transaction failed"
**Possible Causes and Solutions:**
1. **Voter not registered** → Get registered by admin
2. **Already voted** → Each voter can only vote once
3. **Election not active** → Check start/end time
4. **Wrong network** → Select "Hardhat Local" network in MetaMask

### Issue: "Contract not found"
**Solution:**
```bash
# Redeploy the contract
npm run deploy:local
```

### Issue: Frontend not opening
**Solution:**
```bash
# Navigate to frontend directory
cd frontend

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Start server
npm run dev
```

---

## 📚 Project Structure

### Admin Workflow

1. **Connect Wallet** (Admin account)
2. **Create Election**
   - Navigate to Admin Dashboard
   - Enter election name, start time, end time
   - Submit transaction

3. **Add Candidates**
   - Select election
   - Enter candidate details
   - Submit transaction

4. **Register Voters**
   - Select election
   - Enter voter wallet addresses
   - Submit transaction

### Voter Workflow

1. **Connect Wallet** (Voter account)
2. **View Elections**
   - Navigate to Voter Dashboard
   - See active elections

3. **Cast Vote**
   - Select election
   - View candidates
   - Click "Vote" button
   - Confirm transaction in MetaMask

4. **View Results**
   - Navigate to Results page
   - See vote counts and winner

---

## 📁 Project Structure

```
Blockchain Voting Platform/
├── contracts/
│   └── VotingContract.sol          # Main smart contract
├── scripts/
│   └── deploy.js                   # Deployment script
├── test/
│   └── VotingContract.test.js      # Contract tests
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx          # Navigation bar
│   │   ├── context/
│   │   │   └── Web3Context.jsx     # Web3 provider
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── AdminDashboard.jsx  # Admin interface
│   │   │   ├── VoterDashboard.jsx  # Voter interface
│   │   │   ├── Results.jsx         # Results display
│   │   │   └── ElectionHistory.jsx # Past elections
│   │   ├── contracts/
│   │   │   └── VotingContract.json # ABI & address
│   │   ├── App.jsx                 # Main app component
│   │   ├── main.jsx                # Entry point
│   │   └── index.css               # Tailwind styles
│   ├── package.json
│   └── tailwind.config.js
├── docs/
│   ├── PROJECT_REPORT.md           # Final year report
│   ├── VIVA_QUESTIONS.md           # Viva preparation
│   └── DEPLOYMENT_GUIDE.md         # Deployment steps
├── hardhat.config.js               # Hardhat configuration
├── package.json
└── README.md
```

---

## 📚 Documentation

- **[Project Report](docs/PROJECT_REPORT.md)** - Complete final year project documentation
- **[Viva Questions](docs/VIVA_QUESTIONS.md)** - 30+ questions with detailed answers
- **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md)** - Step-by-step deployment instructions

---

## 🧪 Testing

Run comprehensive test suite:

```bash
npx hardhat test
```

Expected output:
```
✓ Should set the correct admin
✓ Should allow admin to create an election
✓ Should prevent double voting
✓ Should calculate correct winner
... (20+ tests)

20 passing (2s)
```

---

## 🔒 Security Features

- **Access Control:** Admin-only functions for election management
- **Double Voting Prevention:** Mapping-based voter tracking
- **Time Restrictions:** Votes only during election period
- **Input Validation:** Comprehensive parameter checking
- **Event Logging:** Complete audit trail
- **Immutable Storage:** Blockchain-based vote records

---

## 🌐 Deployment

### Local Development
```bash
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

### Sepolia Testnet
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

See [Deployment Guide](docs/DEPLOYMENT_GUIDE.md) for detailed instructions.

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎓 Academic Use

This project is designed for educational purposes and final year projects. It demonstrates:
- Blockchain application development
- Smart contract programming
- Web3 integration
- Full-stack dApp development

**Note:** For production use, conduct thorough security audits and testing.

---

## 🙏 Acknowledgments

- Ethereum Foundation for blockchain technology
- Hardhat team for development tools
- OpenZeppelin for security best practices
- React team for frontend framework
- MetaMask for wallet integration

---

## 📧 Contact

For questions or support:
- Open an issue on GitHub
- Check [Deployment Guide](docs/DEPLOYMENT_GUIDE.md) for troubleshooting

---

## 🔗 Useful Links

- [Ethereum Documentation](https://ethereum.org/developers)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Web3.js Documentation](https://web3js.readthedocs.io/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Made with ❤️ for decentralized democracy**

🗳️ **Vote with confidence. Vote on blockchain.**
