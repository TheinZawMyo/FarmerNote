import React from 'react';
import {BottomNavigation} from 'react-native-paper';
import {StatusBar} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import COLORS from '../consts/Colors';

const Tab = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'home', title: 'မူလ', icon: 'home'},
    {key: 'list', title: 'စာရင်း', icon: 'format-list-bulleted'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    list: ListScreen,
  });

  return (
    <>
      <StatusBar animated={true} backgroundColor={COLORS.green} />
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{backgroundColor: COLORS.green}}
      />
    </>
  );
};

export default Tab;
