import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mantle, mantleSepoliaTestnet } from 'wagmi/chains'

// Hardcoded configuration - NO environment variables needed
const projectId = 'a01e311e5083a7d5ab2fa5e5c92eb3ff'

export const config = getDefaultConfig({
  appName: 'MantleGuard',
  projectId,
  chains: [mantleSepoliaTestnet, mantle],
  ssr: true,
})
