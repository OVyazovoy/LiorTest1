import React from 'react';
import { StackNavigator } from 'react-navigation';
import FirstScreen from './Components/FirstScreen';
import SecondScreen from './Components/SecondScreen';

export default StackNavigator({
  First: {
    screen: FirstScreen,
  },
  Second: {
    screen: SecondScreen
  }
}, 
  {
    initialRouteName: 'First',
  }
);