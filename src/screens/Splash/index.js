import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import Button from '../../components/Button';
import styles from './styles';
import { ScrollView } from 'react-native';

const Splash = ({ navigation }) => {
  return (
    <ImageBackground
      style={styles.background}
      source={require('../../../assets/splash.png')}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('../../../assets/logo.png')}
          />
          {/* <Text style={styles.title}>100K+ Premium Recipe</Text> */}
          <Text style={styles.title}>Foodie Guide</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.bigTitle}>Get</Text>
          <Text style={styles.bigTitle}>Cooking</Text>
          <Text style={styles.subtitle}>
            Explore Global Recipes Cooking Guide
          </Text>
          <Button onPress={() => navigation.navigate('Foodie')}>
            Start Cooking
          </Button>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default React.memo(Splash);
