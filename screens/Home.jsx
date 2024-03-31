import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from "react-native";
import { COLORS, DATA, FONTS, SIZES } from "../constants";
import NFTCard from "../components/NFTCard";
import HomeHeader from "../components/HomeHeader";
import { FlashList } from "@shopify/flash-list";

const Home = () => {
  const [nftsData, setNftsData] = useState(DATA);
  const searchHandler = (value) => {
    if (value) {
      const filterData = DATA.filter((nft) =>
        nft.name.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
      setNftsData(filterData);
    } else {
      setNftsData(DATA);
    }
  };
  const NotFoundNFT = () => {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Oops... !</Text>
        <Text style={styles.notFoundText}>Not Found The NFT</Text>
      </View>
    );
  };

  const moveSearchAnimation = useRef(new Animated.Value(0)).current;
  const searchAnimationHandler = () => {
    Animated.spring(moveSearchAnimation, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    searchAnimationHandler();
  }, [searchAnimationHandler]);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
          <Animated.View
            style={{
              top: -190,
              transform: [
                {
                  translateY: moveSearchAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 200],
                  }),
                },
              ],
            }}
          >
            <HomeHeader searchHandler={searchHandler} />
          </Animated.View>
          {!nftsData.length ? (
            <NotFoundNFT />
          ) : (
            <FlashList
              data={nftsData}
              renderItem={({ item }) => <NFTCard NFTData={item} />}
              keyExtractor={(item) => item.id}
              estimatedItemSize={200}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    paddingTop: StatusBar.currentHeight + 10,
  },
  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.xLarge,
  },
  notFoundText: {
    color: COLORS.white,
    fontFamily: FONTS.bold,
    fontSize: SIZES.xLarge,
  },
});
