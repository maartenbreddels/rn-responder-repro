# Repro: a lost tap after a view unmounts during a touch (RN 0.88, iOS)

Steps (see `ReproducerApp/App.tsx`):

1. Tap "Remove me". Its `onPressIn` unmounts it while the finger is down.
2. Tap "Count". Expected "Tap count: 1". Actual: the tap is lost, the count stays 0.
3. Type in the text field, then tap "Count". Expected +1. Actual: this tap is lost too.

Automated check with [Maestro](https://maestro.dev) on an iOS simulator:

```sh
cd ReproducerApp && yarn install && (cd ios && pod install)
yarn react-native run-ios --mode Release
maestro test .maestro/repro.yaml     # fails at "Tap count: 1"
maestro test .maestro/diagnose.yaml  # prints the count after each tap
```

The bug goes away with `enableNativeEventTargetEventDispatching` set to false.

---

# React Native Reproducer

> [!IMPORTANT]  
> Do not just **fork** this repository, but use instead the [![Use this template](https://img.shields.io/badge/-Use%20this%20template-brightgreen)](https://github.com/cortinico/reproducer-react-native/generate) button on GitHub.

This is the React Native **reproducer** template. 

You can use this template to create a minimal, complete, and reproducible project that the community can use to understand what's your problem. You can read more about the principles of a good reproducible project [here](https://stackoverflow.com/help/mcve).

This template is up to date with `react-native@latest` as you can find it on [npm](https://www.npmjs.com/package/react-native/v/latest).

## How to use this repository

1. Click on [![Use this template](https://img.shields.io/badge/-Use%20this%20template-brightgreen)](https://github.com/cortinico/reproducer-react-native/generate) button to create a new repository starting from this one.
2. Git clone your repository locally.
3. Edit the project to reproduce the failure you're seeing.
4. Push your changes, so that Github Actions can run the CI.
