import { View, Text, Image } from "react-native";
import React from "react";
import { Checkbox } from "react-native-paper";
import styles from "../styleSheet/mainStyle";

const Item = ({ checked, item, onPress }) => {
  return (
    <View
      style={{
        marginBottom: 10,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 5,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            backgroundColor: "#eee",
            width: "100%",
            padding: 8,
            fontSize: 15,
            textTransform: "capitalize",
          }}
        >
          {item.title}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          padding: 5,
          backgroundColor: "#fff",
        }}
      >
        <View style={{ flex: 1, marginTop: 20, marginLeft: 5 }}>
          <Checkbox status={checked ? "checked" : "unchecked"} onPress={onPress} />
        </View>
        <View style={{ flex: 2.5 }}>
          <Image source={{ uri: item.diet_image }} style={styles.AddCalImg}></Image>
        </View>
        <View style={{ flex: 4 }}>
          <Text style={styles.addCalTitle}>Calories</Text>
          <Text style={styles.addCalDis}>{item.calories} cals/cup</Text>
          <Text style={styles.addCalTitle}>Carbohydrates</Text>
          <Text style={styles.addCalDis}>{item.carbs} gm</Text>
        </View>
        <View style={{ flex: 3 }}>
          <Text style={styles.addCalTitle}>Fat</Text>
          <Text style={styles.addCalDis}>{item.fat} gm</Text>
          <Text style={styles.addCalTitle}>Proten</Text>
          <Text style={styles.addCalDis}>{item.protein} gm</Text>
        </View>
      </View>
    </View>
  );
};

export default Item;
