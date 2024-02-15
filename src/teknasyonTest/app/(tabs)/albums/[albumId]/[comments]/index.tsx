import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";

import { useLocalSearchParams } from "expo-router";
import { useGeneralService } from "@/services/useGeneral";
import { FlatListComponent } from "@/components/FlatList/flatList";
// comments are not working
export default function Index() {
  const { albumId, comments: PhotoID } = useLocalSearchParams();
  const [commentsState, setComments] = useGeneralService("comments");
  const [pageNumber, setPageNumber] = useGeneralService("commentsPage");
  console.log("commentsState", PhotoID);
  useEffect(() => {
    if (!PhotoID) return;
    fetch(`https://jsonplaceholder.typicode.com/photos/${PhotoID}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments([...data]);
        setPageNumber(1);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatListComponent
        data={commentsState
          .map((item) => {
            const array = [];
            array.push({ label: <Text>{item.id.toString()}</Text>, width: 10, key: item.id.toString() });
            array.push({ label: <Text>{item.postId.toString()}</Text>, width: 20, key: item.id.toString() });
            array.push({ label: <Text>{item.name.toString()}</Text>, width: 20, key: item.id.toString() });
            array.push({ label: <Text>{item.email.toString()}</Text>, width: 20, key: item.id.toString() });
            array.push({ label: <Text>{item.body}</Text>, width: 30, key: item.id.toString() });
            return array;
          })
          .sort((a, b) => Number(a[0].label) - Number(b[0].label))}
        header={[
          { label: "ID", width: 10 },
          { label: "Post ID", width: 20 },
          { label: "Name", width: 20 },
          { label: "Email", width: 20 },
          { label: "Body", width: 30 },
        ]}
        pageNumber={pageNumber}
        onPageChange={setPageNumber}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
