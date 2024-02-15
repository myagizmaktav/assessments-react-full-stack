import { StyleSheet, Text } from "react-native";
import { View } from "@/components/Themed";
import { useEffect } from "react";
import { useGeneralService } from "@/services/useGeneral";
import { FlatListComponent } from "@/components/FlatList/flatList";
import { router } from "expo-router";
export default function Index() {
  const [albums, setAlbums] = useGeneralService("albumsList");
  const [pageNumber, setPageNumber] = useGeneralService("albumsPage");
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums/")
      .then((res) => res.json())
      .then((data) => {
        setAlbums([...data]);
      });
  }, []);

  return (
    <View style={styles.container}>
      <FlatListComponent
        data={albums
          .map((item) => {
            const array = [];
            array.push({
              label: <Text>{item.id.toString()}</Text>,

              width: 20,
              key: item.id.toString(),
            });
            array.push({ label: <Text>{item.userId.toString()}</Text>, width: 20, key: item.id.toString() });
            array.push({ label: <Text>{item.title}</Text>, width: 45, key: item.id.toString() });
            return array;
          })
          .sort((a, b) => Number(a[0].label) - Number(b[0].label))}
        header={[
          { label: "ID", width: 20 },
          { label: "User ID", width: 20 },
          { label: "Title", width: 45 },
        ]}
        onCellClick={(item) => {
          console.log(item);
          router.replace(`/(tabs)/albums/${item}`);
        }}
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
