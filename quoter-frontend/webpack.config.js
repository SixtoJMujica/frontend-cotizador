const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'quoter-frontend',

  exposes: {

    './Quoter': './src/app/quoter/quoter.module.ts',
    './Auth': './src/app/auth/auth.module.ts',

  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
