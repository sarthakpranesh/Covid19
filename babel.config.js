module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['module-resolver', {
      alias: {
        'react-native-linear-gradient': 'react-native-web-linear-gradient'
      }
    }]
  ],
  env: {
    production: {
    }
  }
}
