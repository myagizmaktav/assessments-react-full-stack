import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { PaginationButtons } from "./paginateButtons";
type FLatlistProps = {
  data: { label: string | JSX.Element; width: number; key: string }[][];
  header?: { label: string; width: number }[];
  pageNumber: number;
  onCellClick?: (id: number) => void;
  onPageChange: (page: number) => void;
};
export const FlatListComponent = (props: FLatlistProps) => {
  return (
    <View style={styles.wrapper}>
      {/* Table Container */}
      <View>
        {/* Table Head */}
        <FlatList
          data={props.data.slice((props.pageNumber - 1) * 25, props.pageNumber * 25)}
          keyExtractor={(item, index) => `${item[0].key}_${index}`}
          ListHeaderComponent={
            <>
              <View style={styles.table_head}>
                {props.header?.map((i) => {
                  return (
                    <View style={{ width: `${i.width}%` }} key={i.label}>
                      <Text style={styles.title}>{i.label}</Text>
                    </View>
                  );
                })}
              </View>
            </>
          }
          renderItem={({ item }: { item: FLatlistProps["data"][0] }) => (
            <TouchableOpacity
              style={styles.table_body_single_row}
              key={item[0].key as string}
              onPress={() => {
                if (props.onCellClick) props.onCellClick(Number(item[0].key));
              }}
            >
              {item.map((i, index) => {
                return (
                  <View style={{ width: `${i.width}%` }} key={`${i.key}_${i.width}_${index}`}>
                    {i.label}
                  </View>
                );
              })}
            </TouchableOpacity>
          )}
          ListFooterComponent={
            <View style={styles.paginate}>
              <PaginationButtons
                currentPage={props.pageNumber}
                totalPages={Math.ceil(props.data.length / 25)}
                handlePageClick={(page) => {
                  props.onPageChange(page);
                }}
              ></PaginationButtons>
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
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
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

  table_body_single_row: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    padding: 7,
  },
});
