module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['@babel/plugin-transform-arrow-functions'],
      ['@babel/plugin-transform-shorthand-properties'],
      ['@babel/plugin-transform-template-literals'],
      ['@babel/plugin-transform-regenerator'],
      ['@babel/plugin-transform-react-jsx-self'],
      ['@babel/plugin-transform-react-jsx-source'],
    ],
  };
};