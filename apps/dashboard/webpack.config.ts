import { composePlugins, withNx } from '@nx/webpack';
import { withReact } from '@nx/react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/webpack';

const REACT_SHARED = {
  react: { singleton: true, eager: true, requiredVersion: false },
  'react-dom': { singleton: true, eager: true, requiredVersion: false },
  'react/jsx-runtime': { singleton: true, eager: true, requiredVersion: false },
  'react-router-dom': { singleton: true, requiredVersion: false },
};

export default composePlugins(withNx(), withReact(), (config: any) => {
  config.output = {
    ...config.output,
    uniqueName: 'dashboard',
    publicPath: 'auto',
    scriptType: 'text/javascript',
  };
  config.optimization = {
    ...config.optimization,
    runtimeChunk: false,
  };
  config.plugins.push(
    new ModuleFederationPlugin({
      name: 'dashboard',
      filename: 'remoteEntry.js',
      remotes: {
        event_forms: 'event_forms@http://localhost:4201/remoteEntry.js',
      },
      shared: REACT_SHARED,
      remoteType: 'script',
      dts: false,
    } as any),
  );
  return config;
});
