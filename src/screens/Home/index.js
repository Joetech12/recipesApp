import React, { useContext, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';
import Card from '../../components/Card';
import Categories from '../../components/Categories';
import Input from '../../components/Input';
import RecipeCard from '../../components/RecipeCard';
import Title from '../../components/Title';
import styles from './styles';
import {
  HealthyRecipesContext,
  RecipesContext,
} from '../../context/recipesContext';
import { View } from 'react-native';
import colors from '../../constants/colors';
import { ScrollView } from 'react-native';
import { ActivityIndicator } from 'react-native';

const Home = ({ navigation }) => {
  const [tags, setTags] = useState([]);
  //   const [selectedTag, setSelectedTag] = useState(ALL);
  const [selectedTag, setSelectedTag] = useState();
  const { healthyRecipes } = useContext(HealthyRecipesContext);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const { recipes } = useContext(RecipesContext);
  const [loading, setloading] = useState(true);

 

  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 3000);

    // if (recipes) {
    //   setloading(false);
    // }
  }, []);

  useEffect(() => {
    const tagsList = [];

    recipes?.forEach((recipe) => {
      recipe?.tags?.forEach((tag) => {
        if (!tagsList?.includes(tag?.name)) {
          tagsList?.push(tag?.name);
        }
      });
    });

    setTags(tagsList);
  }, [recipes]);

  useEffect(() => {
    if (selectedTag) {
      const filteredItems = recipes?.filter((rec) => {
        const tag = rec?.tags?.find((t) => t?.name === selectedTag);
        return !!tag;
      });
      setFilteredRecipes(filteredItems);
    } else {
      setFilteredRecipes(recipes);
    }
  }, [selectedTag, recipes]);

  //   console.log(selectedTag);
  //   console.log(recipes);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Input pressable onPress={() => navigation.navigate('Search')} />
        <Title text="Trending Recipes" />
        {loading ? (
          <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color={colors.green} />
          </View>
        ) : (
          <FlatList
            horizontal
            data={healthyRecipes}
            style={{ marginHorizontal: -24, paddingHorizontal: 8 }}
            keyExtractor={(item) => String(item?.id)}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <RecipeCard
                style={index === 0 ? { marginLeft: 24 } : {}}
                onPress={() => navigation.navigate('RecipeDetails', { item })}
                title={item?.name}
                time={item?.cook_time_minutes}
                image={item?.thumbnail_url}
                rating={item?.user_ratings?.score}
                author={
                  item?.credits?.length
                    ? {
                        name: item?.credits[0]?.name || 'Anonymous',
                        image:
                          item?.credits[0]?.image_url ||
                          'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541',
                      }
                    : null
                }
              />
            )}
          />
        )}

        <Categories
          // categories={[ALL, ...tags]}
          categories={tags}
          selectedCategory={selectedTag}
          onCategoryPress={setSelectedTag}
        />
        {loading ? (
          <View style={styles.spinnerContainer2}>
            <ActivityIndicator size="large" color={colors.green} />
          </View>
        ) : (
          <FlatList
            horizontal
            data={filteredRecipes}
            style={{ marginHorizontal: -24 }}
            keyExtractor={(item) => String(item?.id)}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Card
                style={index === 0 ? { marginLeft: 24 } : {}}
                title={item?.name}
                onPress={() => navigation.navigate('RecipeDetails', { item })}
                servings={item?.num_servings}
                image={item?.thumbnail_url}
                rating={item?.user_ratings?.score}
                author={
                  item?.credits?.length
                    ? {
                        name: item?.credits[0]?.name,
                        image: item?.credits[0]?.image_url,
                      }
                    : null
                }
              />
            )}
          />
        )}

        <View
          style={{
            width: '100%',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            //   borderWidth: 1,
            //   borderColor: colors.lightGrey,
            color: colors.lightGrey,
            fontSize: 12,
            marginTop: 30,
          }}
        >
          <Text
            style={{
              color: colors.Grey,
              fontSize: 13,
              opacity: 0.5,
            }}
          >
            Ifeanyi Umeh © 2023
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(Home);
