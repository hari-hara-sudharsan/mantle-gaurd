# 🔗 Wallet Connection Guide - MantleGuard

## ✅ Wallet Connection is Now Fully Integrated!

The wallet connection feature is now properly configured and ready to use with:
- **MetaMask**
- **WalletConnect** (Trust Wallet, Rainbow, etc.)
- **Coinbase Wallet**
- **And 100+ other wallets**

---

## 🎯 How to Connect Your Wallet

### **Step 1: Click "Connect Wallet"**
- Look for the **green "Connect Wallet"** button in the top-right corner
- Click it to open the wallet selection modal

### **Step 2: Choose Your Wallet**
- **MetaMask**: Click the MetaMask option
- **WalletConnect**: Click WalletConnect and scan QR code with mobile wallet
- **Coinbase Wallet**: Click Coinbase Wallet option
- **Other wallets**: Browse and select from the list

### **Step 3: Approve Connection**
- Your wallet will prompt you to approve the connection
- Review the permissions
- Click **"Connect"** or **"Approve"**

### **Step 4: Switch to Mantle Network**
If you're not on Mantle network:
1. You'll see a **"Wrong Network"** button (red)
2. Click it to switch networks
3. Approve the network switch in your wallet
4. The button will turn green when connected properly

---

## 🌐 Supported Networks

### **Mantle Mainnet** ✅
- **Chain ID:** 5000
- **RPC URL:** https://rpc.mantle.xyz
- **Explorer:** https://explorer.mantle.xyz
- **Currency:** MNT

### **Mantle Sepolia Testnet** ✅
- **Chain ID:** 5003
- **RPC URL:** https://rpc.sepolia.mantle.xyz
- **Explorer:** https://sepolia.mantlescan.xyz
- **Currency:** MNT (testnet)

---

## 🔧 Adding Mantle Network to MetaMask

If Mantle network is not in your wallet:

### **Option 1: Automatic (Recommended)**
1. Connect your wallet
2. Click "Wrong Network" button
3. Select "Mantle" from the list
4. Approve the network addition

### **Option 2: Manual**

1. Open MetaMask
2. Click the network dropdown
3. Click **"Add Network"** → **"Add a network manually"**
4. Fill in these details:

**For Mantle Mainnet:**
```
Network Name: Mantle
RPC URL: https://rpc.mantle.xyz
Chain ID: 5000
Currency Symbol: MNT
Block Explorer: https://explorer.mantle.xyz
```

**For Mantle Sepolia Testnet:**
```
Network Name: Mantle Sepolia Testnet
RPC URL: https://rpc.sepolia.mantle.xyz
Chain ID: 5003
Currency Symbol: MNT
Block Explorer: https://sepolia.mantlescan.xyz
```

5. Click **"Save"**

---

## 💰 Getting Testnet MNT

To test on Mantle Sepolia:

1. **Get Sepolia ETH** from a faucet:
   - https://sepoliafaucet.com/
   - https://faucet.quicknode.com/ethereum/sepolia

2. **Bridge to Mantle Sepolia**:
   - Go to: https://bridge.sepolia.mantle.xyz/
   - Connect wallet
   - Bridge Sepolia ETH to Mantle Sepolia
   - Wait 5-10 minutes for confirmation

---

## 🎨 Wallet Features in MantleGuard

Once connected, you can:

### **1. View Wallet Info**
- See your address
- Check balance
- View network status
- Copy address with one click
- Open in block explorer

### **2. Log Audit Results On-Chain**
- After completing an audit
- Click "Log to Blockchain" in Export Center
- Sign the transaction with your wallet
- Get a permanent on-chain proof

### **3. Verify Audit Proofs**
- Verify any audit hash on the blockchain
- Check timestamp and authenticity
- View transaction details

### **4. Network Indicator**
- Always see which network you're on
- Quick network switching
- Visual indicators for wrong network

---

## 🚨 Troubleshooting

### **Issue 1: "Connect Wallet" button does nothing**
**Solution:**
- Make sure you have a wallet extension installed
- Try refreshing the page
- Check browser console for errors
- Try a different browser

### **Issue 2: "Wrong Network" shows up**
**Solution:**
- Click the "Wrong Network" button
- Select Mantle or Mantle Sepolia
- Approve the network switch
- Refresh if needed

### **Issue 3: Wallet connects but disconnects immediately**
**Solution:**
- Check if you have multiple wallets installed
- Disable all except one
- Clear browser cache
- Reconnect

### **Issue 4: Can't sign transactions**
**Solution:**
- Make sure you have enough MNT for gas
- Check if your wallet is locked
- Try reconnecting your wallet
- Check network connection

### **Issue 5: WalletConnect QR code doesn't work**
**Solution:**
- Make sure your mobile wallet supports WalletConnect v2
- Try scanning with a different wallet
- Check your internet connection
- Use MetaMask browser extension instead

---

## 🔒 Security Best Practices

### **✅ DO:**
- Only connect to https://mantlegaurd.vercel.app
- Verify the URL before connecting
- Review all transaction details
- Keep your seed phrase private
- Use hardware wallet for large amounts

### **❌ DON'T:**
- Share your private key or seed phrase
- Approve suspicious transactions
- Connect to unknown websites
- Leave large amounts in hot wallets
- Click links in unsolicited messages

---

## 📊 Wallet Connection Status Indicators

| Color | Status | Meaning |
|-------|--------|---------|
| 🟢 **Green** | Connected | Wallet connected, correct network |
| 🔴 **Red** | Wrong Network | Connected but on wrong chain |
| ⚪ **White** | Not Connected | No wallet connected |

---

## 🔄 Switching Accounts

To switch accounts:
1. Click your connected address
2. Click "Switch Account" in your wallet
3. Select different account
4. The app will update automatically

To disconnect:
1. Click your connected address
2. Click "Disconnect" button
3. Or disconnect from your wallet extension

---

## 🎯 What You Can Do With Connected Wallet

### **Without Payment (Free):**
- ✅ View your address and balance
- ✅ Switch networks
- ✅ Copy address
- ✅ View transaction history on explorer

### **With Payment (Gas Required):**
- 💰 Log audit hash to blockchain (~$0.01-0.10 in MNT)
- 💰 Verify audit on-chain (read-only, usually free)

**Note:** Only blockchain writes require payment. All analysis features (gas profiling, security audits, AI copilot) are **completely free** and don't require any wallet connection!

---

## 📞 Support

**Wallet connection not working?**

1. Check browser console (F12) for errors
2. Try a different browser or wallet
3. Make sure JavaScript is enabled
4. Disable ad blockers temporarily
5. Try incognito/private mode

**Still having issues?**
- Check GitHub Issues: https://github.com/hari-hara-sudharsan/mantle-gaurd/issues
- Verify your wallet extension is up to date
- Check Mantle network status: https://status.mantle.xyz/

---

## ✨ Wallet Connection is 100% Optional!

**Remember:** You can use ALL core features of MantleGuard (gas analysis, security audits, AI copilot) **WITHOUT connecting a wallet!**

Wallet is only needed for:
- Logging audit proofs on-chain
- Viewing your on-chain transaction history

Everything else works perfectly without any wallet connection! 🚀
