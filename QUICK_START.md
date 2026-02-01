# 🚀 Quick Start Guide - Blockchain Voting Platform
## प्रोजेक्ट कैसे चलाएं (How to Run the Project)

---

## ⚡ तीन आसान Steps में Project चलाएं

### 📋 पहले ये Check करें:
- ✅ Node.js installed है (Terminal में `node -v` चलाकर check करें)
- ✅ MetaMask browser extension installed है
- ✅ Internet connection है

---

## Step 1️⃣: Dependencies Install करें

```bash
# Project folder में जाएं
cd "/home/dhrubaraj-pati/Desktop/Blockchain Voting Platform"

# Backend dependencies
npm install

# Frontend dependencies
cd frontend
npm install
cd ..
```

**⏱️ Time:** 2-3 minutes

---

## Step 2️⃣: Blockchain और Contract Setup करें

### Terminal 1 - Blockchain Start करें
```bash
npm run node
```

**✅ Success होने पर दिखेगा:**
- "Started HTTP and WebSocket JSON-RPC server"
- 20 accounts की list with private keys

**⚠️ इस terminal को बंद मत करें!**

---

### Terminal 2 - Contract Deploy करें
```bash
npm run deploy:local
```

**✅ Success होने पर दिखेगा:**
```
VotingContract deployed to: 0x5FbDB...
Contract ABI and address saved to frontend/src/contracts/VotingContract.json
```

---

## Step 3️⃣: Frontend Start करें

### Terminal 3 - Frontend Run करें
```bash
cd frontend
npm run dev
```

**✅ Success होने पर दिखेगा:**
```
➜  Local:   http://localhost:5173/
```

**🌐 Browser में खोलें:** http://localhost:5173

---

## 🦊 MetaMask Setup (एक बार करना है)

### Network Add करें:
1. MetaMask खोलें
2. Network dropdown → "Add Network" → "Add manually"
3. ये details भरें:
   ```
   Network Name: Hardhat Local
   RPC URL: http://127.0.0.1:8545
   Chain ID: 1337
   Currency: ETH
   ```
4. Save करें

### Test Accounts Import करें:
1. Terminal 1 से कोई private key copy करें
2. MetaMask → Account icon → "Import Account"
3. Private key paste करें
4. Import करें

**कम से कम 3 accounts import करें:**
- Account #0 = Admin
- Account #1 = Voter 1
- Account #2 = Voter 2

---

## 🎯 अब Project Use करें!

### 👨‍💼 Admin के रूप में (Account #0):

1. **Election बनाएं:**
   - Admin Dashboard पर जाएं
   - Name: "Test Election"
   - Start Time: अभी का time
   - End Time: 1 घंटे बाद
   - Create Election क्लिक करें
   - MetaMask में Confirm करें

2. **Candidates Add करें:**
   - Candidate 1: Name: "Rahul", Party: "Party A"
   - Candidate 2: Name: "Priya", Party: "Party B"
   - Candidate 3: Name: "Amit", Party: "Party C"

3. **Voters Register करें:**
   - Account #1 का address paste करें
   - Register करें
   - Account #2 का address paste करें
   - Register करें

### 🗳️ Voter के रूप में (Account #1):

1. MetaMask में Account #1 select करें
2. Voter Dashboard पर जाएं
3. Election select करें
4. अपना पसंदीदा candidate choose करें
5. Vote button क्लिक करें
6. MetaMask में Confirm करें

### 📊 Results देखें:

1. Results page पर जाएं
2. Election select करें
3. Real-time vote counts देखें
4. Winner देखें (अगर election end हो गया है)

---

## 🔄 दोबारा Project Run करने के लिए

अगर आपने terminals बंद कर दिए हैं:

```bash
# Terminal 1
npm run node

# Terminal 2 (नया terminal)
npm run deploy:local

# Terminal 3 (नया terminal)
cd frontend
npm run dev
```

**⚠️ Important:** हर बार blockchain restart करने पर:
- Contract फिर से deploy करना होगा
- MetaMask में account reset करना होगा (Settings → Advanced → Reset Account)

---

## 🆘 Common Problems और Solutions

### ❌ "npm: command not found"
**Solution:** Node.js install करें: https://nodejs.org/

### ❌ "Cannot connect to MetaMask"
**Solution:** 
- MetaMask unlock करें
- Hardhat Local network select करें
- Page refresh करें

### ❌ "Transaction failed"
**Solution:**
- Check करें voter registered है या नहीं
- Check करें पहले से vote तो नहीं कर दिया
- MetaMask में account reset करें

### ❌ "Port 5173 already in use"
**Solution:**
```bash
# Port को free करें
killall node
# फिर से try करें
cd frontend
npm run dev
```

---

## 📝 Useful Commands

```bash
# Smart contract test करें
npm test

# Contract compile करें
npm run compile

# Build artifacts clean करें
npm run clean

# Frontend build करें (production)
cd frontend
npm run build
```

---

## 📚 Documentation

पूरी जानकारी के लिए देखें:
- **README.md** - Complete guide
- **docs/PROJECT_REPORT.md** - Project report
- **docs/VIVA_QUESTIONS.md** - Viva preparation
- **docs/DEPLOYMENT_GUIDE.md** - Detailed deployment

---

## ✅ Success Checklist

Project सही से चल रहा है अगर:
- [ ] तीनों terminals running हैं
- [ ] Browser में application खुल गया है
- [ ] MetaMask connect हो गया है
- [ ] Admin dashboard में election create हो गया
- [ ] Voter dashboard में candidates दिख रहे हैं
- [ ] Vote successfully cast हो गया
- [ ] Results page में votes count दिख रहे हैं

---

## 🎉 All Done!

अब आप project को demo कर सकते हैं और अपने final year project के लिए submit कर सकते हैं!

**Questions?** Documentation files देखें या error messages ध्यान से पढ़ें।

**Good Luck! 🚀**
