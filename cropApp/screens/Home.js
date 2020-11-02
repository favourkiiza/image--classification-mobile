import React,{useState,useEffect} from 'react'
import {View, Text, Image, ImageBackground,TextInput,ScrollView,TouchableOpacity,StyleSheet} from 'react-native'
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../constants/Colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Home = ({navigation}) => {
    const [user, setUser] = useState([])
    useEffect( () => {


        async function fetchDropDownDat() {

            try {
                const ifo =  await AsyncStorage.getItem('userData');
                if (ifo) {
                    setUser(JSON.parse(ifo))
                    console.log('datar',user)
                }

            } catch (error) {
                // Error retrieving data
                console.log(error.message);
            }
        } fetchDropDownDat()

    }, []);
  return(
      <View style={{
        backgroundColor:"#e6f7f7",
        flex:1
      }}>
        <View style={{
          backgroundColor:"#00a46c",
          height:"28%",
          borderBottomLeftRadius:20,
          borderBottomRightRadius:20,
          paddingHorizontal:20
        }}>
          <Image
              source={require('../assets/1.png')}
              style={{
                height:10,
                width:20,
                marginTop:50
              }}
          />
          <View style={{
            flexDirection:"row",
            alignItems:"center",
            marginTop:25,
            width:"100%"
          }}>
            <View style={{width:"50%"}}>
              <Text style={{
                fontSize:28,
                color:"#FFF",
                fontWeight:"bold"
              }}>Hi {`${user.first_name}  ${user.last_name}`}</Text>
            </View>
            <View style={{width:"50%",alignItems:"flex-end"}}>
              <Image
                  source={require('../assets/g.png')}
                  style={{height:60,width:60}}
              />
            </View>
          </View>
        </View>
        <LinearGradient
            colors={["rgba(0,164,109,0.4)", "transparent"]}
            style={{
              left:0,
              right:0,
              height:90,
              marginTop:-45
            }}
        >
          <View style={{
            backgroundColor:"#FFF",
            paddingVertical:8,
            paddingHorizontal:20,
            marginHorizontal:20,
            borderRadius:15,
            marginTop:25,
            flexDirection:"row",
            alignItems:"center"
          }}>
            <TextInput
                placeholder="Search"
                placeholderTextColor="#b1e5d3"
                style={{
                  fontWeight:"bold",
                  fontSize:18,
                  width:260
                }}
            />
            <Image
                source={require('../assets/3.png')}
                style={{height:20,width:20}}
            />
          </View>
        </LinearGradient>


        <View style={styles.categoryContainer}>
          <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() =>
                  navigation.navigate('Classification', {title: 'Businesses'})
              }>
            <View style={styles.categoryIcon}>
              <Ionicons name="briefcase-outline" size={35} color={Colors.primary} />
            </View>
            <Text style={styles.categoryBtnTxt}>Classification</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.categoryBtn}
              onPress={() =>
                  navigation.navigate('Classification',{title: 'Help Center'})
              }>
            <View style={styles.categoryIcon}>
              <Ionicons name="add-circle-outline" size={35} color={Colors.primary} />
            </View>
            <Text style={styles.categoryBtnTxt}>Images</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBtn} onPress={() => navigation.navigate('Support', {title: 'Help Center'})}>
            <View style={styles.categoryIcon}>
              <Ionicons name="briefcase-outline" size={35} color={Colors.primary} />
            </View>
            <Text style={styles.categoryBtnTxt}>Support</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          flexDirection:"row",
          paddingHorizontal:20,
          width:"100%",
          alignItems:"center"
        }}>
          <View style={{width:"50%"}}>
              <Text
                  style={{
                      alignSelf: 'center',
                      fontSize: 18,
                      color: Colors.primary,
                  }}>
                  Featured
              </Text>


          </View>
          <View style={{width:"50%", alignItems:"flex-end"}}>
            <View style={{
              backgroundColor:"#00a46c",
              paddingHorizontal:20,
              paddingVertical:5,
              borderRadius:15
            }}>
              <Text style={{
                fontSize:13,
                color:"#FFF"
              }}>More <MaterialCommunityIcons name="chevron-right" color="#fff" size={20} />
              </Text>
            </View>
          </View>
        </View>








        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{height:400}}
        >
          <LinearGradient
              colors={["rgba(0,164,109,0.09)", "transparent"]}
              style={{
                position:"absolute",
                left:0,
                right:0,
                height:100,
                marginTop:220,
                top:0
              }}
          />
          <TouchableOpacity
              onPress={()=>navigation.navigate('LiveLocation', {title: 'Location'})}
              style={{
                height:250,
                elevation:2,
                backgroundColor:"#FFF",
                marginLeft:20,
                marginTop:20,
                borderRadius:15,
                marginBottom:10,
                width:160
              }}
          >
            <Image
                source={require('../assets/20201101_073316.jpg')}
                style={styles.leaf}
            />
            <View style={{
              flexDirection:"row",
              paddingTop:10,
              paddingHorizontal:10
            }}>
              <Text style={{
                fontWeight:"bold"
                  }}>Leaf 1</Text>

            </View>
            <Text style={{
              paddingHorizontal:10,
              fontWeight:"bold",
              color:"#b1e5d3",
              paddingTop:3
            }}>
              Healthy
            </Text>
          </TouchableOpacity>

          <View
              // onPress={()=>navigation.navigate("Detail")}
              style={{
                height:250,
                elevation:2,
                backgroundColor:"#FFF",
                marginLeft:20,
                marginTop:20,
                borderRadius:15,
                marginBottom:10,
                width:160
              }}
          >
            <Image
                source={require('../assets/20201101_073032.jpg')}
                style={styles.leaf}

            />
            <View style={{
              flexDirection:"row",
              paddingTop:10,
              paddingHorizontal:10
            }}>
              <Text style={{
                fontWeight:"bold"
              }}>Leaf 2</Text>

            </View>
            <Text style={{
              paddingHorizontal:10,
              fontWeight:"bold",
              color:"#b1e5d3",
              paddingTop:3
            }}>
              Sick
            </Text>
          </View>

            <LinearGradient
                colors={["rgba(0,164,109,0.09)", "transparent"]}
                style={{
                    position:"absolute",
                    left:0,
                    right:0,
                    height:100,
                    marginTop:220,
                    top:0
                }}
            />
            <TouchableOpacity
                // onPress={()=>navigation.navigate("Detail")}
                style={{
                    height:250,
                    elevation:2,
                    backgroundColor:"#FFF",
                    marginLeft:20,
                    marginTop:20,
                    borderRadius:15,
                    marginBottom:10,
                    width:160
                }}
            >
                <Image
                    source={require('../assets/20201101_081227.jpg')}
                    style={styles.leaf}
                />
                <View style={{
                    flexDirection:"row",
                    paddingTop:10,
                    paddingHorizontal:10
                }}>
                    <Text style={{
                        fontWeight:"bold"
                    }}>Leaf 3</Text>

                </View>
                <Text style={{
                    paddingHorizontal:10,
                    fontWeight:"bold",
                    color:"#b1e5d3",
                    paddingTop:3
                }}>
                    Healthy
                </Text>
            </TouchableOpacity>

            <View
                // onPress={()=>navigation.navigate("Detail")}
                style={{
                    height:250,
                    elevation:2,
                    backgroundColor:"#FFF",
                    marginLeft:20,
                    marginTop:20,
                    borderRadius:15,
                    marginBottom:10,
                    width:160
                }}
            >
                <Image
                    source={require('../assets/20201101_081204.jpg')}
                    style={styles.leaf}

                />
                <View style={{
                    flexDirection:"row",
                    paddingTop:10,
                    paddingHorizontal:10
                }}>
                    <Text style={{
                        fontWeight:"bold"
                    }}>Leaf 4</Text>

                </View>
                <Text style={{
                    paddingHorizontal:10,
                    fontWeight:"bold",
                    color:"#b1e5d3",
                    paddingTop:3
                }}>
                    Sick
                </Text>
            </View>

        </ScrollView>
      </View>
  )
}
export default Home;

const styles = StyleSheet.create({

    categoryContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        marginTop: 25,
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    categoryBtn: {
        flex: 1,
        width: '30%',
        marginHorizontal: 4,
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: 'red',
        backgroundColor: '#fff'
    },
    categoryIcon: {
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 70,
        height: 70,
        backgroundColor: '#e6f7f7' /* '#FF6347' */,
        borderRadius: 50,
        marginTop: 5
    },
    categoryBtnTxt: {
        marginTop: 5,
        color: Colors.primary,
        marginBottom: 7,
        paddingHorizontal: 3,
        textAlign: 'center',
    },
    leaf: {
        height: 180,
        width: 160,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    }

});
