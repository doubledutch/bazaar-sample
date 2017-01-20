var React = require('react-native');
var { AppRegistry } = React;
import HomeView from './home-view.js'

console.error = () => {}
console.disableYellowBox = true;

Bazaar.WebShim.install((DD) => {
  AppRegistry.registerComponent('bazaar_sample', () => HomeView);
  AppRegistry.runApplication('bazaar_sample', {
    rootTag: document.getElementById('react-root'),
    initialProps: { ddOverride: DD }
  })
})