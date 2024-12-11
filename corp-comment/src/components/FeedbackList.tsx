import FeedbackItem from "./FeedbackItem";

const feedbackItems = [
  {
    upvoteCount: 593,
    badgeLetter: "B",
    companyName: "ByteGrad",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab impedit rem consectetur sapiente! Cumque, exercitationem!",
    daysAgo: 4,
  },
  {
    upvoteCount: 410,
    badgeLetter: "C",
    companyName: "Crunchyroll",
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab impedit rem consectetur sapiente! Cumque, exercitationem!",
    daysAgo: 3,
  },
];

export default function FeedbackList() {
  return (
    <ol className="feedback-list">
      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem feedbackItem={feedbackItem} />
      ))}{" "}
    </ol> // daca scriam "{}", ar fi trebuit sa returnez obiectul
    // asa cu "()" pot sa scriu direct obiectul, nu mai trebuie sa scriu "return".
  );
}
