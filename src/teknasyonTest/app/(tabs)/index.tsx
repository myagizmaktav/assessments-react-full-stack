import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { useEffect } from "react";
import { useGeneralService } from "@/services/useGeneral";
import { FlatListAlbumComponent } from "@/components/FlatList/flatList";

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
      <FlatListAlbumComponent data={albums} pageNumber={pageNumber} onPageChange={setPageNumber} />
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
