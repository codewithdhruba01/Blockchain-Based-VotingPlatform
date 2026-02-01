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

## 📦 Installation & Setup (इंस्टॉलेशन और सेटअप)

### Prerequisites (आवश्यक चीजें)
- Node.js (v16+) - [Download करें](https://nodejs.org/)
- npm (Node.js के साथ आता है)
- MetaMask Browser Extension - [Install करें](https://metamask.io/)

### Step-by-Step Setup (चरण-दर-चरण सेटअप)

#### Step 1: Dependencies Install करें

```bash
# Project की root directory में जाएं
cd "/home/dhrubaraj-pati/Desktop/Blockchain Voting Platform"

# Backend dependencies install करें
npm install

# Frontend dependencies install करें
cd frontend
npm install

# Tailwind CSS install करें (अगर नहीं है तो)
npm install -D tailwindcss postcss autoprefixer

# Root directory में वापस आएं
cd ..
```

#### Step 2: Local Blockchain Start करें

**Terminal 1 खोलें:**
```bash
# Local Hardhat network start करें
npm run node

# या
npx hardhat node
```

यह command एक local Ethereum network start करेगा:
- URL: `http://127.0.0.1:8545`
- Chain ID: `1337`
- 20 test accounts बनाएगा, हर एक में 10,000 ETH होगा
- Account addresses और private keys display होंगे

**⚠️ Important: इस terminal को running रखें!**

#### Step 3: Smart Contract Deploy करें

**Terminal 2 खोलें:**
```bash
# Contract को local network पर deploy करें
npm run deploy:local

# या
npx hardhat run scripts/deploy.js --network localhost
```

**Output देखेंगे:**
```
Deploying VotingContract...
VotingContract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Contract ABI and address saved to frontend/src/contracts/VotingContract.json
Deployed by: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

**📝 Note:** Contract address और admin address को note कर लें।

#### Step 4: MetaMask Configure करें

1. **MetaMask Extension खोलें**
2. **Network dropdown (ऊपर बीच में) पर क्लिक करें**
3. **"Add Network" → "Add a network manually" पर क्लिक करें**
4. **Network details भरें:**
   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `1337`
   - Currency Symbol: `ETH`
5. **"Save" पर क्लिक करें**

#### Step 5: Test Accounts Import करें MetaMask में

Terminal 1 (जहां `hardhat node` चल रहा है) से:

1. **कोई भी private key copy करें** (Account #0, #1, #2)
2. **MetaMask में:**
   - Account icon पर क्लिक करें
   - "Import Account" select करें
   - Private key paste करें
   - "Import" पर क्लिक करें

**Recommended:** कम से कम 3 accounts import करें:
- **Account #0:** Admin के लिए
- **Account #1-2:** Voters के लिए

#### Step 6: Frontend Start करें

**Terminal 3 खोलें:**
```bash
# Frontend directory में जाएं
cd frontend

# Development server start करें
npm run dev
```

**Output:**
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

#### Step 7: Application Open करें

1. **Browser खोलें** और जाएं: `http://localhost:5173`
2. **"Connect Wallet" button पर क्लिक करें**
3. **MetaMask में connection approve करें**
4. **आप तैयार हैं! 🎉**

---

## 🚀 How to Use (कैसे इस्तेमाल करें)

### Admin के रूप में (Account #0)

#### 1. Election बनाएं
- **Admin Dashboard** पर जाएं
- Election का नाम भरें (जैसे: "Student Council Election 2026")
- Start time और end time select करें
- **"Create Election"** पर क्लिक करें
- MetaMask में transaction approve करें

#### 2. Candidates Add करें
- Election select करें
- Candidate का नाम और party भरें
- **"Add Candidate"** पर क्लिक करें
- Transaction approve करें
- 3-4 candidates add करें

#### 3. Voters Register करें
- Election select करें
- Voter का wallet address paste करें (MetaMask से)
- **"Register Voter"** पर क्लिक करें
- Transaction approve करें

### Voter के रूप में (Account #1 या #2)

#### 1. MetaMask में Account Switch करें
- MetaMask account icon पर क्लिक करें
- Voter account select करें (जो registered है)

#### 2. Vote Cast करें
- **Voter Dashboard** पर जाएं
- Active election select करें
- Candidates देखें
- अपने पसंदीदा candidate के लिए **"Vote"** button पर क्लिक करें
- MetaMask में transaction approve करें
- ✅ Success message मिलेगा!

#### 3. Results देखें
- **Results** page पर जाएं
- Election select करें
- Vote counts और winner देखें
- Real-time results!

---

## 🧪 Testing (टेस्टिंग)

### Smart Contract Tests चलाएं

```bash
# Root directory में
npm test

# या
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

## 📝 Available Commands (उपलब्ध Commands)

### Backend (Root Directory से)
```bash
npm run node          # Local blockchain start करें
npm run compile       # Smart contracts compile करें
npm test              # Tests चलाएं
npm run deploy:local  # Local network पर deploy करें
npm run clean         # Build artifacts clean करें
```

### Frontend (frontend/ Directory से)
```bash
npm run dev           # Development server start करें
npm run build         # Production build बनाएं
npm run preview       # Production build preview करें
```

---

## 🔧 Troubleshooting (समस्या समाधान)

### समस्या: "Cannot connect to MetaMask"
**समाधान:**
- MetaMask installed और unlocked है check करें
- Page refresh करें
- Browser cache clear करें

### समस्या: "Transaction failed"
**कारण और समाधान:**
1. **Voter registered नहीं है** → Admin से register कराएं
2. **पहले से vote कर चुके हैं** → हर voter सिर्फ एक बार vote कर सकता है
3. **Election active नहीं है** → Start/end time check करें
4. **Wrong network** → MetaMask में "Hardhat Local" network select करें

### समस्या: "Contract not found"
**समाधान:**
```bash
# Contract फिर से deploy करें
npm run deploy:local
```

### समस्या: Frontend नहीं खुल रहा
**समाधान:**
```bash
# Frontend directory में जाएं
cd frontend

# Dependencies फिर से install करें
rm -rf node_modules package-lock.json
npm install

# Server start करें
npm run dev
```

---

## 📚 Project Structure (प्रोजेक्ट की संरचना)

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
