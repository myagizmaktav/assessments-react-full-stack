// https://okerioh.medium.com/pagination-in-react-native-with-page-ebfca1874f17
import { StyleSheet, TouchableOpacity, Text } from "react-native";
type PaginationButtonsProps = {
  currentPage: number;
  totalPages: number;
  handlePageClick: (page: number) => void;
};
export const RenderPaginationButtons = (props: PaginationButtonsProps) => {
  const maxButtonsToShow = 3;
  let startPage = Math.max(1, props.currentPage - Math.floor(maxButtonsToShow / 2));
  let endPage = Math.min(props.totalPages, startPage + maxButtonsToShow - 1);

  if (endPage - startPage + 1 < maxButtonsToShow) {
    startPage = Math.max(0, endPage - maxButtonsToShow + 1);
  }

  const buttons = [];

  for (let i = startPage; i <= endPage; i++) {
    buttons.push(
      <TouchableOpacity key={i} onPress={() => props.handlePageClick(i)} style={[styles.paginationButton, i === props.currentPage ? styles.activeButton : null]}>
        <Text style={{ color: "white" }}>{i}</Text>
      </TouchableOpacity>
    );
  }

  return buttons;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: "transparent",
  },
  paginationButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 4,
    backgroundColor: "gray",
  },
  activeButton: {
    backgroundColor: "#000",
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
  },
});
