import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { RenderPaginationButtons } from "./paginateButtons";
type FLatlistProps = {
  data: { userId: number; id: number; title: string }[];
  pageNumber: number;
  onCellClick?: (id: number) => void;
  onPageChange: (page: number) => void;
};
export const FlatListAlbumComponent = (props: FLatlistProps) => {
  return (
    <View style={styles.wrapper}>
      {/* Table Container */}
      <View>
        {/* Table Head */}
        <FlatList
          data={props.data.slice((props.pageNumber - 1) * 25, props.pageNumber * 25)}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={
            <View style={styles.table_head}>
              <View style={{ width: "20%" }}>
                <Text style={styles.table_head_captions}>ID</Text>
              </View>
              <View style={{ width: "20%" }}>
                <Text style={styles.table_head_captions}>UserID</Text>
              </View>
              <View style={{ width: "45%" }}>
                <Text style={styles.table_head_captions}>Title</Text>
              </View>
            </View>
          }
          renderItem={({ item }: { item: FLatlistProps["data"][0] }) => (
            <TouchableOpacity style={styles.table_body_single_row}>
              <View style={{ width: "20%" }}>
                <Text style={styles.table_data}>{item.id}</Text>
              </View>
              <View style={{ width: "20%" }}>
                <Text style={styles.table_data}>{item.userId}</Text>
              </View>
              <View style={{ width: "60%" }}>
                <Text style={styles.table_data}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={
            <View style={styles.paginate}>
              <RenderPaginationButtons
                currentPage={props.pageNumber}
                totalPages={Math.ceil(props.data.length / 25)}
                handlePageClick={(page) => {
                  props.onPageChange(page);
                }}
              ></RenderPaginationButtons>
            </View>
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // https://www.lahoregraphix.com/react-native-table/
  container: {
    minWidth: 250,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
  },
  paginate: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
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
  wrapper: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  table_head: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    padding: 7,
    backgroundColor: "#000",
  },
  table_head_captions: {
    fontSize: 15,
    color: "white",
  },

  table_body_single_row: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    padding: 7,
  },
  table_data: {
    fontSize: 11,
  },
});
