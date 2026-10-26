/**
 * @format
 */

// Control run: turn off the new EventTarget event dispatching. This must run
// before React Native loads, so it uses require() (imports are hoisted).
require('react-native/src/private/featureflags/ReactNativeFeatureFlags').override(
  { enableNativeEventTargetEventDispatching: () => false },
);

const { AppRegistry } = require('react-native');
const App = require('./App').default;
const { name: appName } = require('./app.json');

AppRegistry.registerComponent(appName, () => App);
