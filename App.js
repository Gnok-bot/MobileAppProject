import React, { useState, useEffect } from 'react';
import {
  Button,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  Switch,
  useColorScheme,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';
import API from './api.js';

var NUM_SONGS = 10;

export function ListScreen({ route, navigation }) {
  const [listData, setListData] = useState(Array(15).fill(null));
  const [title, setTitle] = useState();
  const newArr = [];

  function loadSong(title) {
    API(title).then((data) => {
      let songs = data.response.hits; // array of songs
      songs = songs.slice(0, NUM_SONGS); // Take only the first NUM_SONGS songs
      for (var i = 0; i < NUM_SONGS; i++) {
        newArr.push(songs[i]);
      }
      setListData(newArr);
    });
  }
  // show this at when the app first loads
  let dataToShow = [];

  //do nothing
  if (listData[0] === undefined) {
  }

  // api call successful, listData is not null array
  else if (listData[0] !== null) {
    dataToShow = [];
    for (let k = 0; k < NUM_SONGS; k++) {
      let lyrics_url = `https://genius.com${listData[k].result.path}`;
      new_obj = {
        key: listData[k].result.title,
        artist: listData[k].result.artist_names,
        imgSource: listData[k].result.header_image_url,
        lyrics: lyrics_url,
      };
      dataToShow.push(new_obj);
    }
  }

  if (route.params?.isEnabled) {
    //light
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'white',
        }}>
        <View style={{ padding: 20 }}>
          <View style={{ paddingBottom: 10 }}>
            <Button
              color="#3361FF"
              title="setting"
              onPress={() => {
                navigation.navigate('Setting', {});
              }}
            />
          </View>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.input}
              placeholder="Search your song"
              onChangeText={(title) => setTitle(title)}
            />
            <Button
              color="#3361FF"
              title="Search"
              onPress={() => {
                loadSong(title);
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              color: '#3361FF',
              fontWeight: 'bold',
              marginTop: 5,
            }}>
            Song List
          </Text>
          <FlatList
            data={dataToShow}
            renderItem={({ item }) => {
              return (
                <TouchableHighlight
                  onPress={() => {
                    navigation.navigate('Details', {
                      songName: item.key,
                      image: item.imgSource,
                      artist: item.artist,
                      lyrics: item.lyrics,
                      isEnabled: route.params?.isEnabled
                    });
                  }}>
                  <View style={styles.row}>
                    <Image style={styles.image} source={item.imgSource} />
                    <Text style={styles.title}>
                      {item.key} - {item.artist}
                    </Text>
                  </View>
                </TouchableHighlight>
              );
            }}
          />
        </View>
      </View>
    );
  } else {
    //dark
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          backgroundColor: 'gray',
        }}>
        <View style={{ padding: 20 }}>
          <View style={{ paddingBottom: 10 }}>
            <Button
              color="#000000"
              title="setting"
              onPress={() => {
                navigation.navigate('Setting', {});
              }}
            />
          </View>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.input}
              placeholder="Search your song"
              onChangeText={(title) => setTitle(title)}
            />
            <Button
              color="#000000"
              title="Search"
              onPress={() => {
                loadSong(title);
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              color: '#000000',
              fontWeight: 'bold',
              marginTop: 5,
            }}>
            Song List
          </Text>
          <FlatList
            data={dataToShow}
            renderItem={({ item }) => {
              return (
                <TouchableHighlight
                  onPress={() => {
                    navigation.navigate('Details', {
                      songName: item.key,
                      image: item.imgSource,
                      artist: item.artist,
                      lyrics: item.lyrics,
                      isEnabled: route.params?.isEnabled
                    });
                  }}>
                  <View style={styles.row}>
                    <Image style={styles.image} source={item.imgSource} />
                    <Text style={styles.title}>
                      {item.key} - {item.artist}
                    </Text>
                  </View>
                </TouchableHighlight>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

function DetailsScreen({ route, navigation }) {
  const { songName, image, artist, lyrics } = route.params;
  if (route.params?.isEnabled) {
    //light
    return (
    <View style={{ padding: 20, flexDirection: 'row' }}>
      <View style={{ flex: 2 }}>
        <Image style={styles.imagedetails} source={image} />
      </View>
      <View style={{ flex: 3, padding: 10, flexDirection: 'column' }}>
        <Text style={{ fontSize: 20, fontWeight:'bold' }}>{songName} </Text>
        <View style={{ height: 1, backgroundColor: 'darkgray', margin: 5 }} />
        <Text>Artist: {artist} </Text>
        <View style={{ height: 1, backgroundColor: 'darkgray', margin: 5 }} />
        <Text>lyrics: {lyrics} </Text>
      </View>
    </View>
  );
  } else {
    //dark
    return (
    <View style={{flex: 1,
          backgroundColor: 'gray',
    }}>
      <View style={{ padding: 20, flexDirection: 'row'}}>
        <View style={{ flex: 2 }}>
          <Image style={styles.imagedetails} source={image} />
        </View>
        <View style={{ flex: 3, padding: 10}}>
          <Text style={{ fontSize: 20, fontWeight:'bold', color:'white'}}>{songName} </Text>
          <View style={{ height: 1, backgroundColor: 'lightgray', margin: 5 }} />
          <Text style={{color:'white'}}>Artist: {artist} </Text>
          <View style={{ height: 1, backgroundColor: 'lightgray', margin: 5 }} />
          <Text style={{color:'white'}}>Lyrics: {lyrics} </Text>
        </View>
      </View>
    </View>
  );
  }
}

function SettingScreen({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  function getStyle() {
    if (isEnabled == true) {
      return {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      };
    } else {
      return {
        backgroundColor: 'gray',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      };
    }
  }

  function gettextStyle() {
    if (isEnabled == true) {
      return {
        fontSize: 20,
        color: 'black',
        padding:10
      };
    } else {
      return {
        fontSize: 20,
        color: 'white',
        padding:10
      };
    }
  }

  return (
    <View style={getStyle()}>
      <Text style={gettextStyle()}>Dark / Light Mode</Text>
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <View style={{padding:10}}>
      <Button
        color="#3361FF"
        title="Enter"
        onPress={() => {
          navigation.navigate('Home', {
            isEnabled: isEnabled,
          });
        }}
      />
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={ListScreen}
          options={{
            title: 'Song Explorer',
            headerStyle: {
              backgroundColor: '#3361FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: 'Song Detail',
            headerStyle: {
              backgroundColor: '#3361FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            title: 'Setting',
            headerStyle: {
              backgroundColor: '#3361FF',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
            },
          }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    height: 100,
    flex: 1,
    padding: 5,
  },
  image: {
    height: 100,
    flex: 2,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
  },
  imagedetails: {
    height: 100,
    flex: 2,
    borderRadius: 5,
  },
  title: {
    fontSize: 15,
    flex: 5,
    padding: 20,
    borderWidth: 1,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  input: {
    height: 40,
    width: 210,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    marginTop: 5,
  },
});