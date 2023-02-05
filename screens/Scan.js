import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { COLORS, SIZES, FONTS, icons, images } from '../constants'



const Scan = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.padding * 4,
          paddingHorizontal: SIZES.padding * 3
        }}
      >
        <TouchableOpacity
          style={{
            width: 45,
            justifyContent: "center",
            alignItems: "center"
          }}
          onPress={() => navigation.navigate("home")}
        >
          <Image
            source={icons.close}
            style={{
              width: 20,
              height: 20,
              tintColor: COLORS.white
            }}
          />
        </TouchableOpacity>

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ ...FONTS.body3, color: COLORS.white }}>Scan For Payment</Text>
        </View>

        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: COLORS.green
          }}
          onPress={() => console.warn("info")}
        >
          <Image
            source={icons.info}
            style={{
              width: 25,
              height: 25,
              tintColor: COLORS.white
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderScanFocus = () => {
    return (
      <View
      style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
      }}
      >

        <Image 
          source={images.focus}
          resizeMode='stretch'
          style={{
            width:200,
            height:300,
            marginTop:"-55%"
          }}
        />
      </View>
    );
  };

  const renderPaymentMethods = () => (
    <View
      style={{
        position:"absolute",
        bottom:0,
        right:0,
        left:0,
        height:220,
        padding:SIZES.padding*3,
        borderTopRightRadius:SIZES.radius,
        borderTopLeftRadius:SIZES.radius,
        backgroundColor:COLORS.white
      }}
    >
      <Text style={{ ...FONTS.h4 }}>Another Payments Methods</Text>
      <View
        style={{
          flex:1,
          flexDirection:"row",
          alignItems:"flex-start",
          marginTop:SIZES.padding*2
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection:"row",
            alignItems:"center"
          }}
          onPress={() => console.warn("phone number")}
        >
          <View
            style={{
              width:40,
              height:40,
              backgroundColor:COLORS.lightpurple,
              alignItems:"center",
              justifyContent:"center",
              borderRadius:10
            }}
          >
            <Image 
              source={icons.phone}
              resizeMode='cover'
              style={{
                width:25,
                height:25,
                tintColor:COLORS.purple
              }}
            />
          </View>
          <Text style={{ marginLeft:SIZES.padding, ...FONTS.body4}}>Phone Number</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flexDirection:"row",
            alignItems:"center",
            marginLeft:SIZES.padding*2
          }}
          onPress={() => console.warn("bar code")}
        >
          <View
            style={{
              width:40,
              height:40,
              backgroundColor:COLORS.lightGreen,
              alignItems:"center",
              justifyContent:"center",
              borderRadius:10
            }}
          >
            <Image 
              source={icons.barcode}
              resizeMode='cover'
              style={{
                width:25,
                height:25,
                tintColor:COLORS.primary
              }}
            />
          </View>
          <Text style={{ marginLeft:SIZES.padding, ...FONTS.body4}}>Bar Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const BarCodeScanned = (result) => {
    console.warn(result.data)
  }
  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        flashMode={Camera.Constants.FlashMode.off}
        onBarCodeScanned={BarCodeScanned}
      >
        {renderHeader()}
        {renderPaymentMethods()}
        {renderScanFocus()}
      </Camera>
    </View>
  );
};

export default Scan;

const styles = StyleSheet.create({});
