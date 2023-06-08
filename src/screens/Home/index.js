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

// const ALL = 'All';

const Home = ({ navigation }) => {
  const [tags, setTags] = useState([]);
  //   const [selectedTag, setSelectedTag] = useState(ALL);
  const [selectedTag, setSelectedTag] = useState();
  const { healthyRecipes } = useContext(HealthyRecipesContext);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const { recipes } = useContext(RecipesContext);
  //   const [data, setData] = useState([]);

  //   console.log(healthyRecipes);
  //   useEffect(() => {
  //     setData(recipes);
  //   }, []);

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

  //   useEffect(() => {
  //     if (selectedTag === ALL) {
  //       setData(recipes);
  //     } else {
  //       const filteredData = recipes?.filter((recipe) =>
  //         recipe?.tags?.filter((item) => item?.name.includes(selectedTag))
  //       );
  //       setData(filteredData);
  //     }
  //   }, [selectedTag]);
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
      <Input pressable onPress={() => navigation.navigate('Search')} />

      <Title text="Healthy Recipes" />

      <FlatList
        horizontal
        data={healthyRecipes}
        style={{ marginHorizontal: -24 }}
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

      <Categories
        // categories={[ALL, ...tags]}
        categories={tags}
        selectedCategory={selectedTag}
        onCategoryPress={setSelectedTag}
      />

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
    </SafeAreaView>
  );
};

export default React.memo(Home);
