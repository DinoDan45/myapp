import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList, Image, Dimensions } from 'react-native';

export default function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false); 
  const urlBase = 'https://pokeapi.co/api/v2';
  const flatListRef = useRef(); 

  const getPokemons = () => {
    if (loading) return; 
    setLoading(true);

    fetch(`${urlBase}/pokemon?limit=20&offset=${(page - 1) * 20}`) 
      .then(response => response.json())
      .then(async (dataAPI) => {
        const pokemons = dataAPI.results;
        const pokemonData = await Promise.all(
          pokemons.map(pokemon => fetch(pokemon.url).then(response => response.json()))
        );
        setData(pokemonData); 
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  };

  const nextPage = () => {
    setPage(prevPage => prevPage + 1);
    getPokemons();
    scrollToTop(); 
  };

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  const renderPokemon = ({ item }) => (
    <View style={styles.containerBooks}>
      <Image source={{ uri: item.sprites.front_default }} style={styles.image} />
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemInfo}>Altura: {item.height} | Peso: {item.weight}</Text>
      <Text style={styles.itemInfo}>Tipo(s): {item.types.map(typeInfo => typeInfo.type.name).join(', ')}</Text>
      <Text style={styles.itemInfo}>Habilidades: {item.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}</Text>
      <Text style={styles.itemInfo}>Estadísticas: {item.stats.map(statInfo => `${statInfo.stat.name}: ${statInfo.base_stat}`).join(', ')}</Text>
      </View>
  );

  return (
    <View style={styles.container}>
      <Button onPress={getPokemons} title='Conoce a tu Pokémon' color="green" />
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderPokemon}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        ListFooterComponent={
          !loading && data.length > 0 ? (
            <View style={styles.footerButtons}>
              <Button onPress={nextPage} title='Siguiente' color="green" /> 
            </View>
          ) : (
            loading ? <Text>Cargando...</Text> : null
          )
        }
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    padding: 10,
    borderRadius: 15,
  },

  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },

  containerBooks: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    margin: 5,
    padding: 10,
    borderRadius: 15,
    width: Dimensions.get('window').width / 2 - 20,
  },

  image: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },

  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  itemInfo: {
    fontSize: 14,
  },

  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'center', 
    marginTop: 10,
  },
});