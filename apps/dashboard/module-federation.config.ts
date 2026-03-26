import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'dashboard',
  remotes: ['event_forms'],
};

export default config;
