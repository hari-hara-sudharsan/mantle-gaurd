# 🛡️ MantleGuard

> **AI-Native Security & Optimization Platform for Mantle Network**

MantleGuard is the first unified platform that combines gas optimization, security auditing, and AI-powered code assistance specifically for Mantle L2 developers. Think of it as "The Cursor AI of Web3 Security" - intelligent, contextual, and built for the modern blockchain developer.

[![Built for Mantle](https://img.shields.io/badge/Built%20for-Mantle-00FFB2?style=for-the-badge)](https://mantle.xyz)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)



## The Problem

Most Solidity tools are designed for Ethereum and treat every EVM chain similarly. However, Mantle introduces its own execution model and fee behavior, making traditional tools insufficient.

| Existing Tools        | Limitation                         |
| --------------------- | ---------------------------------- |
| Generic Gas Reporters | No Mantle-specific gas analysis    |
| Generic Auditors      | Miss Mantle Layer-2 patterns       |
| Documentation         | Static and difficult for beginners |
| AI Assistants         | Lack Mantle ecosystem knowledge    |

**MantleGuard bridges this gap by providing a dedicated AI toolkit for Mantle developers.**

---

# Key Features

## ⛽ Mantle Gas Profiler

* Function-level gas analysis
* L2 Execution Fee estimation
* Data Availability (DA) Fee estimation
* Total transaction cost prediction
* Live MNT token pricing support
* AI-powered gas optimization suggestions
* Color-coded optimization score

---

## 🔍 AI Audit Engine

* Mantle-aware vulnerability detection
* Reentrancy analysis
* Access control validation
* Unsafe external call detection
* Integer overflow/underflow analysis
* Bridge interaction checks
* Severity classification

  * Critical
  * High
  * Medium
  * Low

---

## 🤖 AI Copilot

An interactive assistant trained for Mantle development.

Capabilities:

* Explain Solidity code
* Explain audit findings
* Suggest fixes
* Optimize gas usage
* Answer Mantle ecosystem questions
* Generate secure implementation examples

---

# Simple Architecture

```
                User
                  │
                  │
          Next.js Frontend
                  │
      ┌───────────┼───────────┐
      │           │           │
 Gas Profiler  Audit Engine  AI Copilot
      │           │           │
      └───────────┼───────────┘
                  │
          Backend API Layer
                  │
        AI Services + Parser
                  │
             Mantle Network
```

---

# Frontend

Built using:

* Next.js
* React
* TypeScript
* Tailwind CSS
* Shadcn/UI
* Framer Motion
* Monaco Editor
* Wagmi Wallet Integration

Frontend Modules:

* Dashboard
* Gas Profiler
* Audit Report
* AI Copilot
* Contract Upload
* Demo Contract Library

---

# Backend

Backend Responsibilities:

* Contract parsing
* Gas estimation
* AI audit pipeline
* Report generation
* Copilot retrieval
* Mantle RPC communication

Core Services:

* FastAPI / Node API
* AI Analysis Engine
* Gas Calculation Engine
* Audit Engine
* Documentation Retrieval
* Report Generator

---

# 🚀Tech Stack

### 🖥️Frontend

* ▲Next.js
* ⚛️React
* 🔷TypeScript
* 🎨Tailwind CSS
* 🧩Shadcn/UI
* 📝Monaco Editor

### ⚙️Backend

* ⚡FastAPI / Node.js
* 🐍Python
* 🔗REST API

### 🤖AI

* 🧠Claude / GPT
* 📚RAG Pipeline
* 💡Prompt Engineering

### ⛓️Blockchain

* 🟢Mantle RPC
* 🔷Solidity
* ⚙️Ethers.js
* 🔗Wagmi

### 💾Storage

* 🗄️Vector Database
* ⚡Local Cache

---

# 🚀 Future Goals

MantleGuard is designed to evolve beyond a hackathon project into the **AI Developer Security Platform for the Mantle ecosystem**. Our long-term vision is to provide developers with everything they need to build secure, optimized, and intelligent smart contracts.

## 📅 Short-Term Goals

* ✅ Release the **VS Code Extension** for real-time smart contract analysis.
* ✅ Add **one-click gas optimization suggestions** with automated code fixes.
* ✅ Support **live Mantle Mainnet and Testnet analysis**.
* ✅ Generate **downloadable PDF and HTML audit reports**.
* ✅ Improve AI Copilot with Mantle-specific documentation and examples.

---

## 🔥 Mid-Term Goals

* 🛡️ Build an **AI Auto-Fix Engine** that not only detects vulnerabilities but also generates secure replacement code.
* ⛽ Introduce **real-time gas simulation** before contract deployment.
* 📊 Create a **Developer Analytics Dashboard** showing gas trends, optimization history, and security scores.
* 🤝 Enable **team collaboration** with shared audit workspaces and comments.
* 🔄 Integrate with **GitHub Actions and CI/CD pipelines** for automatic security checks on every commit.

---

## 🌐 Long-Term Goals

* 🧠 Develop a **Mantle AI Security Agent** capable of continuously monitoring deployed contracts for new risks.
* 🌉 Expand support to **multiple EVM chains** while maintaining Mantle-first optimizations.
* 📚 Launch a **community-driven vulnerability knowledge base** powered by AI.
* 🏆 Create a **Security & Gas Score** that becomes the standard benchmark for Mantle projects.
* 🔗 Enable **on-chain audit verification**, allowing projects to publicly prove that their contracts were analyzed by MantleGuard.
* 🤖 Introduce **AI-powered contract generation**, producing secure and gas-efficient Solidity templates from natural language prompts.

---



# Quick Start

## Clone

```bash
git clone <repository-url>

cd mantleguard
```

---

## Install Frontend

```bash
cd apps/web

npm install

npm run dev
```

---

## Install Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn main:app --reload
```

---

## Required Dependencies

Frontend

* next
* react
* typescript
* tailwindcss
* shadcn/ui
* framer-motion
* lucide-react
* monaco-editor
* wagmi
* ethers

Backend

* fastapi
* uvicorn
* pydantic
* requests
* python-dotenv

---

# Builder Insights

> "Generic Solidity tools understand Ethereum. MantleGuard understands Mantle."

> "Gas optimization should not require manual calculations. Developers deserve function-level insights with AI recommendations."

> "Security tools should explain vulnerabilities, not just list them. MantleGuard combines detection with understandable guidance."

---

# Impact

| Metric                         | Value |
| ------------------------------ | ----- |
| Mantle-specific Gas Analysis   | ✅     |
| AI Smart Contract Audit        | ✅     |
| AI Developer Copilot           | ✅     |
| Function-Level Cost Estimation | ✅     |
| Severity-Based Reports         | ✅     |
| Beginner-Friendly UX           | ✅     |

---

# Vision

MantleGuard aims to become the **default AI developer toolkit for the Mantle ecosystem**, empowering builders with intelligent gas analysis, automated security auditing, and conversational development assistance—all within a unified platform.

---

**Built for the Mantle Hackathon • AI DevTools Track**








