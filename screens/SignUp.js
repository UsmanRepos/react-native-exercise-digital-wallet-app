import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, TextInput, Modal, TouchableWithoutFeedback, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import { COLORS, SIZES, FONTS, icons, images } from '../constants'


const SignUp = ({ navigation }) => {

  const [showPassword, setShowPassword] = useState(false)
  const [areas, setAreas] = useState([])
  const [selectedArea, setSelectedArea] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(response => response.json())
      .then(data => {

        console.log(data)
        let areaData = data.map((item) => {
          return {
            code: item.cca2,
            name: item.name.common,
           
            flag: item.flags.png
          }
        });

        setAreas(areaData);

        if (areaData.length > 0) {
          let defaultData = areaData.filter(a => a.code == "PK")
          if (defaultData.length > 0) {
            setSelectedArea(defaultData[0])
          }
        };

      });
  }, []);

  const renderHeader = () => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: SIZES.padding * 6,
        paddingHorizontal: SIZES.padding * 2
      }}
    >
      <Image
        source={icons.back}
        resizeMode='contain'
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS.white
        }}
      />
      <Text style={{ marginLeft: SIZES.padding * 1.5, color: COLORS.white, ...FONTS.h4 }}>Sign Up</Text>
    </TouchableOpacity>
  );

  const renderLogo = () => (
    <View
      style={{
        width: "100%",
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        marginTop: SIZES.padding * 5
      }}
    >
      <Image
        source={images.wallieLogo}
        resizeMode='contain'
        style={{
          width: "60%",
          height: "100%"
        }}
      />
    </View>
  );

  const renderForm = () => (
    <View
      style={{
        marginTop: SIZES.padding * 3,
        paddingHorizontal: SIZES.padding * 3
      }}
    >
      {/* Full Name */}
      <View style={{ marginTop: SIZES.padding * 3 }} >
        <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Full Name</Text>
        <TextInput
          style={{
            height: 40,
            borderBottomColor: COLORS.white,
            borderBottomWidth: 1,
            marginVertical: SIZES.padding,
            color: COLORS.white,
            ...FONTS.body3
          }}
          placeholder='Enter Full Name'
          placeholderTextColor={COLORS.white}
          selectionColor={COLORS.white}
        />
      </View>

      {/* Phone Number */}
      <View style={{ marginTop: SIZES.padding * 2 }} >
        <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Phone Number</Text>

        <View style={{ flexDirection: "row" }}>

          <TouchableOpacity
            style={{
              width: 100,
              height: 50,
              flexDirection: "row",
              marginHorizontal: 5,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              ...FONTS.body2
            }}
            onPress={() => setModalVisible(true)}
          >
            <View style={{ justifyContent: "center" }}>
              <Image
                source={icons.down}
                resizeMode='contain'
                style={{
                  width: 10,
                  height: 10,
                  tintColor: COLORS.white
                }}
              />
            </View>
            <View style={{ justifyContent: "center", marginLeft: 5 }}>
              <Image
                source={{ uri: selectedArea?.flag }}
                resizeMode='contain'
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
            <View style={{ justifyContent: "center", marginLeft: 5 }}>
              <Text style={{ color: COLORS.white, ...FONTS.body3 }}>{selectedArea?.callingCode}</Text>
            </View>
          </TouchableOpacity>
          <TextInput
            style={{
              flex: 1,
              height: 40,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              marginVertical: SIZES.padding,
              color: COLORS.white,
              ...FONTS.body3
            }}
            placeholder='Enter Phone Number'
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
          />
        </View>
      </View>

      {/* Password */}
      <View style={{ marginTop: SIZES.padding * 2 }}>
        <Text style={{ color: COLORS.lightGreen, ...FONTS.body3 }}>Password</Text>
        <TextInput
          style={{
            marginVertical: SIZES.padding,
            borderBottomWidth: 1,
            borderBottomColor: COLORS.white,
            height: 40,
            color: COLORS.white,
            ...FONTS.body3
          }}
          placeholder='Enter Password'
          placeholderTextColor={COLORS.white}
          selectionColor={COLORS.white}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 10,
            right: 0,
            width: 30,
            height: 30
          }}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Image
            source={showPassword ? icons.disable_eye : icons.eye}
            resizeMode='contain'
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.white
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderButton = () => (
    <View style={{ margin: SIZES.padding * 3 }}>
      <TouchableOpacity
        style={{
          height: 60,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: COLORS.black,
          borderRadius: SIZES.radius / 1.5,
        }}
        onPress={() => navigation.navigate("home")}
      >
        <Text style={{ ...FONTS.h3, color: COLORS.white }}> Continue </Text>
      </TouchableOpacity>
    </View>
  );

  const renderAreaCodesModal = () =>{

    const renderItem = ({item}) => (
      <TouchableOpacity
        style={{
          padding:SIZES.padding, 
          flexDirection:"row"
        }}
        onPress={() => {
          setModalVisible(false)
          setSelectedArea(item)
        }}
      >
        <Image 
          source={{uri: item.flag}}
          style={{
            width:30,
            height:30,
            marginRight:10
          }}
        />
        <Text style={{ ...FONTS.body4, color: COLORS.black }}>{item.name}</Text>
      </TouchableOpacity>
    )
    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
      >
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(false)}
        >
          <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <View
              style={{
                height:400,
                width:SIZES.width*0.8,
                backgroundColor:COLORS.lightGreen,
                borderRadius:SIZES.radius
              }}
            >
              <FlatList 
                data={areas}
                renderItem={renderItem}
                keyExtractor={item => item.code}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  marginBottom:SIZES.padding*2,
                  padding:SIZES.padding*2
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>

      </Modal>
    )
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : null}
      style={{ flex: 1 }}
    >
      <LinearGradient
        colors={[COLORS.lime, COLORS.emerald]}
        style={{ flex: 1 }}
      >
        <ScrollView>
          {renderHeader()}
          {renderLogo()}
          {renderForm()}
          {renderButton()}
        </ScrollView>
      </LinearGradient>
      {renderAreaCodesModal()}
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
