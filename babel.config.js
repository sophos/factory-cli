module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: '16'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread'
  ]
};
