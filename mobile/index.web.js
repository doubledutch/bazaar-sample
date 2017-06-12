var React = require('react-native');
var { AppRegistry } = React;
import HomeView from './src/home-view.js'

console.error = () => { }
console.disableYellowBox = true;

const runApp = (DD) => {
  AppRegistry.registerComponent('scavenger_hunt', () => HomeView);
  AppRegistry.runApplication('scavenger_hunt', {
    rootTag: document.getElementById('react-root'),
    initialProps: { ddOverride: DD }
  })
}

if (window.DD && window.DD.Events) {
  Bazaar.WebShim.install((DD) => runApp)
} else {
  runApp(null)
}
