import '@rainbow-me/rainbowkit/dist/index.css';
import { Meteor } from 'meteor/meteor';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [
    alchemyProvider({ apiKey: Meteor.settings.public.alchemy_key }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Repbase',
  chains
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});