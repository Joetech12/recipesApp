import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Splash from './src/screens/Splash';
import Home from './src/screens/Home';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './src/screens/Search';
import { getRecipesList } from './src/http';
import {
  HealthyRecipesContext,
  RecipesContext,
} from './src/context/recipesContext';
import RecipeDetails from './src/screens/RecipeDetails';

const Stack = createStackNavigator();

// export const RecipesContext = React.createContext();
// export const HealthyRecipesContext = React.createContext();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

const BackButton = (props) => {
  //   console.log(props);
  return (
    <Pressable onPress={props.onPress}>
      <Image style={styles.back} source={require('./assets/back.png')} />
    </Pressable>
  );
};

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [healthyRecipes, setHealthyRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      const rec = await handleRecipesFetch(null, '15');
      setRecipes(rec);
      const healthyRec = await handleRecipesFetch('healthy', '5');
      setHealthyRecipes(healthyRec);
    })();
  }, []);

  const handleRecipesFetch = async (tags, size) => {
    try {
      const recipes = await getRecipesList(tags, size);
      return recipes?.data?.results;
    } catch (e) {
      console.log('error fetching recipes :>> ', e);
    }
  };

  return (
    <HealthyRecipesContext.Provider
      value={{ healthyRecipes, setHealthyRecipes }}
    >
      <RecipesContext.Provider value={{ recipes, setRecipes }}>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator
            screenOptions={{
              headerTitleAlign: 'center',
              headerShadowVisible: false,
            }}
          >
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerLeft: null, gestureEnabled: false }}
            />
            <Stack.Screen
              name="Search"
              component={Search}
              options={{ headerLeft: (props) => <BackButton {...props} /> }}
            />
            <Stack.Screen
              name="RecipeDetails"
              component={RecipeDetails}
              options={{
                headerLeft: (props) => <BackButton {...props} />,
                title: '',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RecipesContext.Provider>
    </HealthyRecipesContext.Provider>
  );
}

const styles = StyleSheet.create({
  back: {
    width: 24,
    height: 24,
    margin: 16,
  },
});
