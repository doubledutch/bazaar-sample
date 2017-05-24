import React, { Component } from 'react'
import ReactNative from 'react-native'
import CachedImage from 'react-native-cached-image'
import StackNavigator from 'react-navigation/src/navigators/StackNavigator.js'
import { NavigationActions } from 'react-navigation'
import Horizon from '@horizon/client'

// This is just a set of imports that we want available (at their current version)
// for all doubledutch apps
// We don't want to include libraries that might still be changing frequently
// as this locks us into that version (until we have a better story for that)