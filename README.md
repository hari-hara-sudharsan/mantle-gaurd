# 🛡️ MantleGuard

> **AI-Native Security & Optimization Platform for Mantle Network**

MantleGuard is the first unified platform that combines gas optimization, security auditing, and AI-powered code assistance specifically for Mantle L2 developers. Think of it as "The Cursor AI of Web3 Security" - intelligent, contextual, and built for the modern blockchain developer.

[![Built for Mantle](https://img.shields.io/badge/Built%20for-Mantle-00FFB2?style=for-the-badge)](https://mantle.xyz)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

## ✨ Features

### 🔥 Gas Profiler
- **Real-time gas analysis** with function-level breakdown
- **Mantle DA cost calculation** - optimize for L2 data availability
- **AI-powered optimization suggestions** with estimated savings
- **Before/after comparison** - see the impact of optimizations
- **Interactive charts** - visualize gas consumption patterns

### 🔒 Security Audit Engine
- **Automated vulnerability detection** powered by AI
- **Attack simulation** - animated visualization of exploit scenarios
- **AI fix generator** - automatic secure code generation
- **Executive summaries** - business-friendly impact analysis
- **Mantle-specific security patterns** - L2 bridge safety, sequencer dependencies

### 🤖 AI Copilot
- **Context-aware conversations** - knows your contract, findings, and history
- **Streaming responses** - real-time AI interaction
- **Smart explanations** - why vulnerabilities matter and how to fix them
- **Code suggestions** - generate secure, optimized alternatives

### ⛓️ On-Chain Verification
- **Audit hash logging** - immutable proof on Mantle Network
- **Report verification** - cryptographic integrity checks
- **Transaction tracking** - transparent audit history
- **Public verifiability** - anyone can verify report authenticity

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm 9+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mantleguard.git
cd mantleguard

# Install dependencies
pnpm install

# Setup environment variables
cd apps/web
cp .env.example .env.local

# Update .env.local with your configuration
# NEXT_PUBLIC_API_URL=http://localhost:8000
# NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id

# Start development server
pnpm run dev
```

Visit [http://localhost:3001](http://localhost:3001) 🎉

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         Frontend (Next.js 15)           │
│  ┌─────────────────────────────────┐   │
│  │   Pages & Components Layer      │   │
│  ├─────────────────────────────────┤   │
│  │   Service Layer (API Client)    │   │
│  ├─────────────────────────────────┤   │
│  │   State Management (Context)    │   │
│  └─────────────────────────────────┘   │
└──────────────┬──────────────────────────┘
               │ HTTP/WebSocket
┌──────────────▼──────────────────────────┐
│       Backend API (FastAPI)             │
│  ┌──────────┬──────────┬──────────┐    │
│  │   Gas    │  Audit   │ Copilot  │    │
│  │  Engine  │  Engine  │   RAG    │    │
│  └──────────┴──────────┴──────────┘    │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Claude/OpenAI API               │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│         Mantle Network                  │
│     (AuditLogger Smart Contract)        │
└─────────────────────────────────────────┘
```

## 📁 Project Structure

```
mantleguard/
├── apps/
│   └── web/                    # Next.js frontend
│       ├── src/
│       │   ├── app/            # Pages & routes
│       │   ├── components/     # React components
│       │   ├── services/       # API service layer
│       │   ├── providers/      # Context providers
│       │   └── lib/            # Utilities
│       └── public/             # Static assets
├── packages/                   # Shared packages (future)
└── docs/                       # Documentation
```

## 🔧 Technology Stack

### Frontend
- **Next.js 15** - React framework with Turbopack
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Monaco Editor** - Code editing
- **Recharts** - Data visualization
- **Wagmi + RainbowKit** - Web3 wallet integration

### Backend (API)
- **FastAPI** - Python web framework
- **Claude/OpenAI** - AI models
- **Solidity Analyzer** - Static analysis
- **Web3.py** - Blockchain interaction

### Blockchain
- **Mantle Network** - L2 deployment
- **Solidity** - Smart contracts
- **Ethers.js** - Web3 library

## 🎯 Use Cases

### For Smart Contract Developers
- Optimize gas costs before deployment
- Find and fix vulnerabilities early
- Learn L2-specific best practices
- Generate secure code alternatives

### For Security Auditors
- Automated first-pass analysis
- AI-assisted vulnerability research
- Generate audit reports
- Verify report integrity on-chain

### For Project Teams
- Track contract health over time
- Share verified audit reports
- Monitor gas optimization progress
- Educate team members on security

## 🏆 Key Differentiators

### vs. Slither/Mythril
- ✅ Beautiful modern UI (not CLI)
- ✅ AI explanations (not just findings)
- ✅ Gas optimization included
- ✅ Mantle L2 specific
- ✅ Beginner-friendly learning mode

### vs. Tenderly
- ✅ Open source
- ✅ L2-optimized analysis
- ✅ Unified gas + security
- ✅ AI copilot included
- ✅ Free to use

### vs. Other Hackathon Projects
- ✅ Production-ready polish
- ✅ Complete end-to-end workflow
- ✅ Mantle ecosystem-specific
- ✅ AI-native from ground up
- ✅ Actually works!

## 📊 Service Layer API

All frontend-backend communication uses standardized service methods:

```typescript
// Gas Analysis
const result = await gasService.analyze({
  contract: code,
  analysisId: "uuid"
})

// Security Audit
const audit = await auditService.analyze({
  contract: code,
  analysisId: "uuid"
})

// AI Copilot (Streaming)
await copilotService.chatStream({
  question: "Why is this vulnerable?",
  analysisId: "uuid",
  onChunk: (chunk) => console.log(chunk),
  onComplete: (full) => console.log(full)
})

// Report Generation
const report = await reportService.generate({
  analysisId: "uuid",
  format: "json"
})

// On-Chain Logging
const tx = await walletService.logAuditHash({
  analysisId: "uuid",
  reportHash: "0x...",
  walletAddress: "0x..."
})

// Verification
const verified = await walletService.verifyAudit({
  reportHash: "0x..."
})
```

## 🔐 Security Features

- **SHA-256 hashing** for report integrity
- **On-chain audit logging** via Mantle smart contract
- **Cryptographic verification** of audit reports
- **Transaction transparency** - all audits are publicly verifiable
- **Wallet-based authentication** for audit ownership

## 🎨 UI/UX Highlights

- **Dark mode optimized** for extended coding sessions
- **Smooth animations** with Framer Motion
- **Responsive design** - works on mobile and desktop
- **Monaco editor** - VSCode-like code editing
- **Real-time streaming** - see AI responses as they generate
- **Interactive visualizations** - charts, graphs, heatmaps
- **Empty state polish** - helpful guidance when no data
- **Loading states** - never leave users wondering

## 📈 Performance

- **Page load**: < 3s
- **Chat response**: < 2s (streaming starts immediately)
- **Page transitions**: < 500ms
- **Build size**: Optimized with code splitting
- **Lighthouse score**: 90+ across all metrics

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: [mantleguard.xyz](https://mantleguard.xyz)
- **Documentation**: [docs.mantleguard.xyz](https://docs.mantleguard.xyz)
- **Twitter**: [@MantleGuard](https://twitter.com/mantleguard)
- **Discord**: [Join our community](https://discord.gg/mantleguard)

## 🙏 Acknowledgments

Built with ❤️ for the Mantle Network community.

Special thanks to:
- Mantle Network team for the incredible L2 platform
- OpenAI/Anthropic for AI capabilities
- Next.js team for the amazing framework
- The Web3 security community for inspiration

---

**MantleGuard** - Secure, Optimize, Deploy with Confidence 🛡️✨

