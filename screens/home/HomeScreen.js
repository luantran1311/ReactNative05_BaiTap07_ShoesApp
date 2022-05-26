import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  fetchCategories,
  fetchProducts,
  fetchProductByCategoryId,
} from './HomeThunks';
import {useDispatch, useSelector} from 'react-redux';
import StaggeredList from '@mindinventory/react-native-stagger-view';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const dataProducts = useSelector(state => state.home.dataProducts);
  const dataCategories = useSelector(state => state.home.dataCategories);

  const likeIcon = require('../../assets/images/like.png');
  const iconClose = require('../../assets/images/icon_close.png');
  const iconTune = require('../../assets/images/icon_tune.png');

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);

  const renderItem = item => (
    <View
      style={{
        margin: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        padding: 16,
      }}>
      <Image
        source={likeIcon}
        style={{width: 16, height: 16, alignSelf: 'flex-end'}}
      />
      <Image
        resizeMode="contain"
        source={{uri: item.image}}
        style={{width: '100%', height: 100}}
      />
      <Text style={{fontSize: 18, fontWeight: '500', marginTop: 16}}>
        {item.name}
      </Text>
      <Text style={{fontSize: 16, color: '#ccc', marginTop: 16}}>
        {(item.price - 0.01).toFixed(2)} US$
      </Text>
    </View>
  );

  const renderItemCategory = item => (
    <TouchableOpacity
      onPress={() =>
        dispatch(fetchProductByCategoryId({id: item.id, name: item.category}))
      }>
      <Text style={{color: '#fff', margin: 8, fontSize: 16, fontWeight: '500'}}>
        {item.category}
      </Text>
    </TouchableOpacity>
  );
  console.log('dataProducts', dataProducts);
  return (
    // <SafeAreaView style={{flex: 1}}>
    //   <StaggeredList
    //     data={dataProducts}
    //     animationType={'FADE_IN_FAST'}
    //     renderItem={({item}) => renderItem(item)}
    //   />
    // </SafeAreaView>
    <View style={{flex: 1}}>
      <View
        style={{
          height: 250,
          width: '100%',
          backgroundColor: '#000',
          position: 'absolute',
        }}></View>

      <SafeAreaView style={{flex: 1}}>
        {/* AppBar */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
          }}>
          <Image source={iconClose} style={{width: 24, height: 24}} />
          <Image source={iconTune} style={{width: 24, height: 24}} />
        </View>

        {/* Categories */}
        <View>
          <FlatList
            data={dataCategories}
            horizontal
            renderItem={({item}) => renderItemCategory(item)}
          />
        </View>

        {/* Products */}
        <StaggeredList
          data={dataProducts}
          animationType={'FADE_IN_FAST'}
          renderItem={({item}) => renderItem(item)}
        />
      </SafeAreaView>
    </View>
  );
}
