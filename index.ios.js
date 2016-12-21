var React = require('react-native');
var { AppRegistry } = React;
import HomeView from './home-view.js'

console.error = () => {}
console.disableYellowBox = true;
AppRegistry.registerComponent('AppStoreSample', () => HomeView);
