import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'event_forms',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
