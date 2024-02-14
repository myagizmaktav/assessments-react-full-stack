import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { useEffect } from "react";
import { useGeneralService } from "@/services/useGeneral";
import { FlatListComponent } from "@/components/FlatList/flatList";

export default function Index() {
  const [albums, setAlbums] = useGeneralService("albumsList");
  const [pageNumber, setPageNumber] = useGeneralService("albumsPage");
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/albums/")
      .then((res) => res.json())
      .then((data) => {
        setAlbums(data);
      });
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/albums.tsx" /> */}

      {/* data={albums
          .map((item) => {
            const array = [];
            array.push({ label: item.id.toString(), width: 20 });
            array.push({ label: item.userId.toString(), width: 20 });
            array.push({ label: item.title, width: 45 });
            return array;
          })
          .sort((a, b) => Number(a[0].label) - Number(b[0].label))}
        header={[
          { label: "ID", width: 20 },
          { label: "User ID", width: 20 },
          { label: "Title", width: 45 },
        ]} */}
      <FlatListComponent
        data={albums
          .map((item) => {
            const array = [];
            array.push({ label: item.id.toString(), width: 20, key: item.id.toString() });
            array.push({ label: item.userId.toString(), width: 20, key: item.id.toString() });
            array.push({ label: item.title, width: 45, key: item.id.toString() });
            return array;
          })
          .sort((a, b) => Number(a[0].label) - Number(b[0].label))}
        header={[
          { label: "ID", width: 20 },
          { label: "User ID", width: 20 },
          { label: "Title", width: 45 },
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
