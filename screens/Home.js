import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import { featuresData, specialPromoData } from '../utils'
import { COLORS, SIZES, icons, images, FONTS } from '../constants'


const Home = () => {

  const [features, setFeatures] = useState(featuresData)
  const [specialPromos, setSpecialPromos] = useState(specialPromoData)

  const renderHeader = () => {
    return (
      <View style={{ flexDirection: "row", paddingVertical: SIZES.padding * 2 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ ...FONTS.h1 }}>Hello!</Text>
          <Text style={{ ...FONTS.body2, color: COLORS.gray }}>Cs Concepts</Text>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",

            }}
          >
            <Image
              source={icons.bell}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.secondary
              }}
            />
            <View
              style={{
                width: 10,
                height: 10,
                position: "absolute",
                top: -10,
                right: -10,
                backgroundColor: COLORS.red,
                borderRadius: 5
              }}
            ></View>
          </TouchableOpacity>

        </View>
      </View>
    );
  };

  const renderBanner = () => (
    <View
      style={{
        height:120,
        borderRadius:20
      }}
    >
      <Image
        source={images.banner}
        resizeMode='cover'
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 20
        }}
      />
    </View>
  );

  const renderFeatures = () => {

    const Header = () =>(
      <View style={{ marginBottom:SIZES.padding * 2 }}>
        <Text style={{ ...FONTS.h3}}>Features</Text>
      </View>
    );

    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{
          marginBottom:SIZES.padding*2,
          width:60,
          alignItems:"center"
        }}
        onPress={() => console.warn(item.description)}
      >
        <View
          style={{
            width:50,
            height:50,
            marginBottom:5,
            borderRadius:20,
            backgroundColor:item.backgroundColor,
            justifyContent:"center",
            alignItems:"center"
          }}
        >
          <Image 
            source={item.icon}
            resizeMode='contain'
            style={{
              width:20,
              height:20,
              tintColor:item.color
            }}
          />
        </View>
        <Text style={{ ...FONTS.body4, textAlign:"center", flexWrap:"wrap"}}>{item.description}</Text>
      </TouchableOpacity>
    )
    return (
      <FlatList
        ListHeaderComponent={Header} 
        contentContainerStyle={{ marginTop: SIZES.padding * 2}}
        numColumns={4}
        columnWrapperStyle={{ justifyContent:"space-between"}}
        data={features}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
      />
    );
  };

  const renderPromos = () => {

    const HeaderComponent = () => (
      <View>
        {renderHeader()}
        {renderBanner()}
        {renderFeatures()}
        {renderPromoHeader()}
      </View>
    );

    const renderPromoHeader = ( ) => {
      return (
        <View
          style={{
            flexDirection:"row",
            marginBottom:SIZES.padding
          }}
        >
          <View style={{ flex:1 }}>
            <Text style={{ ...FONTS.h3}}>Special Promos</Text>
          </View>
          <TouchableOpacity
            onPress={() => concole.warn("view all")}
          >
            <Text style={{...FONTS.body4, color:COLORS.gray }}>View all</Text>
          </TouchableOpacity>
        </View>
      );
    };
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          marginTop: SIZES.base,
          width: SIZES.width / 2.5
        }}
      >
        <View
          style={{
            height: 80,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: COLORS.primary
          }}
        >
          <Image
            source={images.promoBanner}
            resizeMode='cover'
            style={{
              width: "100%",
              height: "100%",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            backgroundColor: COLORS.lightGray,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20
          }}
        >
          <Text style={{ ...FONTS.h4 }}>{item.title}</Text>
          <Text style={{ ...FONTS.body4 }}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    )
    return (
      <FlatList
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3, paddingBottom:80 }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={specialPromos}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
      />
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      {renderPromos()}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
