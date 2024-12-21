import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedbackItemsContext } from "../../lib/hooks";

export default function FeedbackList() {
  const { filteredFeedbackItems, isLoading, errorMessage } =
    useFeedbackItemsContext(); // folosesc hook-ul custom pentru a accesa contextul

  return (
    //spinner pentru loading prima data
    //fiecare item din lista de feedbackuri
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {filteredFeedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}{" "}
    </ol> // daca scriam "{}", ar fi trebuit sa returnez obiectul
    // asa cu "()" pot sa scriu direct obiectul, nu mai trebuie sa scriu "return".
  );
}
