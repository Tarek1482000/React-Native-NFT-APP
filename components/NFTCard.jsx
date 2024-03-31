import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";

import { COLORS, SIZES } from "../constants";
import NFTImage from "../components/NFTImage";
import NFTAvatars from "../components/NFTAvatars ";
import NFTTitle from "../components/NFTTitle";
import NTFDetails from "../screens/NFTDetails";
import { useNavigation } from "@react-navigation/native";
import NftInfo from "./NftInfo";

const NFTCard = ({ NFTData }) => {
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate("NFTDetails", { NFTData });
  };
  return (
    <TouchableWithoutFeedback>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={pressHandler}>
          <NFTImage image={NFTData.image} imageStyles={styles.imageStyles} />
        </TouchableOpacity>

        <View style={styles.cardTop}>
          <NFTAvatars avatars={NFTData.avatars} />
        </View>

        <View style={styles.cardBottom}>
          <NFTTitle
            _name={NFTData.name}
            creator={NFTData.creator}
            date={NFTData.date}
          />
          <View style={{ marginTop: SIZES.small + 5 }}>
            <NftInfo
              comments={NFTData.comments}
              views={NFTData.views}
              price={NFTData.price}
              Love
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default NFTCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.cardBg,
    borderRadius: SIZES.medium,
    marginBottom: SIZES.xLarge,
    marginVertical: SIZES.small - 5,
    marginHorizontal: 14,
    padding: 12,
  },
  cardTop: {
    width: "100%",
    paddingHorizontal: SIZES.medium,
    marginTop: -30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardBottom: { width: "100%", padding: SIZES.medium },
  imageStyles: {
    width: "100%",
    height: 300,
    borderRadius: 30,
  },
});
