import React, { useContext, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Image, Text } from 'react-native';

import styles from './styles';
import Title from '../../components/Title';
import { View } from 'react-native';
import { ScrollView } from 'react-native';

const RecipeDetails = ({ route }) => {
  const { item } = route?.params || {};
  const nutrition = item?.nutrition;
  delete nutrition?.updated_at;
  const nutritionKeys = Object.keys(nutrition || {});
  const instructions = item?.instructions || [];

  //   console.log('item', item);
  //   console.log('nutritionKeys', nutritionKeys);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image style={styles.image} source={{ uri: item?.thumbnail_url }} />
        <Title style={{ marginBottom: 32 }} text={item?.name} />

        {nutritionKeys?.map((key) => (
          <View key={key} style={styles.row}>
            <Text style={styles.key}>{key}</Text>
            <Text style={styles.value}>{nutrition[key]}</Text>
          </View>
        ))}

        <Title
          style={{ marginTop: 32, marginBottom: 16 }}
          text="Instructions"
        />

        <View style={{ marginBottom: 50 }}>
          {instructions?.map((instruction, index) => (
            <View key={instruction?.id} style={styles.instructionRow}>
              <Text style={styles.index}>{index + 1}</Text>
              <Text style={styles.instructionText}>
                {instruction?.display_text}
              </Text>
            </View>
          ))}
        </View>

        {!instructions?.length ? (
          <Text style={styles.value}>No instructions found</Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(RecipeDetails);
