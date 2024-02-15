import { Image, StyleSheet, TextInput } from "react-native";
import { Text, View } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useGeneralService, useGeneralServiceValue } from "@/services/useGeneral";
import { FlatListComponent } from "@/components/FlatList/flatList";
import { CreateSvg } from "@/components/svg/createSvg";
import { router } from "expo-router";
import { AlbumPhotos } from "@/types/albumPhotos";
export default function AlbumPhotoList() {
  const { albumId } = useLocalSearchParams();
  const [photos, setPhotos] = useGeneralService("albumPhotos");
  const [pageNumber, setPageNumber] = useGeneralService("albumPhotosPage");
  const [search, setSearch] = useGeneralService("albumSearchText");
  const albumData = useGeneralServiceValue("album");
  const [photo, setPhoto] = useGeneralService("albumPhoto");
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      .then((res) => res.json())
      .then((data) => {
        setPhotos([...data]);
      });
  }, [albumId]);
  return (
    <View style={styles.container}>
      <View style={{ padding: 5 }}>
        <Text>Album Title: {albumData.title}</Text>
        <Text>Album User ID: {albumData.userId}</Text>
        <Text>Find Photo With Title:</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => {
            setSearch(text);
          }}
        />
      </View>
      <FlatListComponent
        data={photos
          .filter((item) => (search ? item.title.includes(search) : true))
          .map((item) => {
            const array = [];
            array.push({ label: <Text>{item.id.toString()}</Text>, width: 15, key: item.id.toString() });
            array.push({ label: <Text>{item.albumId.toString()}</Text>, width: 20, key: item.albumId.toString() });
            array.push({
              label: (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <CreateSvg size={75} color={`#${item.thumbnailUrl.split("/").at(-1)}`}></CreateSvg>
                </View>
              ),
              width: 30,
              key: item.thumbnailUrl.toString(),
            });
            array.push({ label: <Text>{item.title.toString()}</Text>, width: 25, key: item.title.toString() });

            return array;
          })
          .sort((a, b) => Number(a[0].label) - Number(b[0].label))}
        header={[
          { label: "ID", width: 15 },
          { label: "Album ID", width: 20 },
          { label: "Thumbnail", width: 30 },
          { label: "Title", width: 25 },
        ]}
        onCellClick={(item) => {
          router.replace(`/(tabs)/albums/${albumId}/${item}`);
          setPhoto(photos.find((i) => i?.id === item) as AlbumPhotos);
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
