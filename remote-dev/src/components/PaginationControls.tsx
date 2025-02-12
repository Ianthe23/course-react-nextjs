import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationControlsProps = {
  currentPage: number;
  onClick: (direction: "next" | "previous") => void;
};

export default function PaginationControls({
  currentPage,
  onClick,
}: PaginationControlsProps) {
  return (
    <section className="pagination">
      <button
        onClick={() => onClick("previous")}
        className="pagination__button"
      >
        <ArrowLeftIcon />
        Page {currentPage - 1}
      </button>
      <button onClick={() => onClick("next")} className="pagination__button">
        <ArrowRightIcon />
        Page {currentPage + 1}
      </button>
    </section>
  );
}
