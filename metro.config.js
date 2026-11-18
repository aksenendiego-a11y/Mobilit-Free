const { getDefaultConfig } = require('expo/metro-config');

module.exports = async () => {
  const config = await getDefaultConfig(__dirname);
  config.resolver.unstable_enablePackageExports = true;
  config.resolver.unstable_conditionNames = ['require', 'import', 'default'];
  return config;
};
