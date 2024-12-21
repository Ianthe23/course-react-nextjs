import { useContext } from "react";
import { FeedbackItemsContext } from "../contexts/FeedbackItemsContextProvider";

export function useFeedbackItemsContext() {
  const context = useContext(FeedbackItemsContext);
  if (context === null) {
    throw new Error(
      "useFeedbackItemsContext must be used within a FeedbackItemsContextProvider"
    );
  }
  return context;
}
