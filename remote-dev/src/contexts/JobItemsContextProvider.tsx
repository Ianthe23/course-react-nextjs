import { createContext, useCallback, useMemo, useState } from "react";
import { JobItem, PageDirection, SortBy } from "../lib/types";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";

type JobItemsContext = {
  jobItems: JobItem[] | undefined;
  jobItemsSortedAndSliced: JobItem[];
  isLoading: boolean;
  totalNumberOfResults: number;
  totalNumberOfPages: number;
  currentPage: number;
  sortBy: SortBy;
  handleChangePage: (direction: PageDirection) => void;
  handleChangeSortBy: (newSortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // dependency on other context
  const { debouncedSearchText } = useSearchTextContext();

  // state
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  // sorting in place if using jobItems itself => jobItems has been mutated
  // we create a new array to not modify the original array
  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [sortBy, jobItems]
  );

  // derived state
  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        (currentPage - 1) * RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ),
    [currentPage, jobItemsSorted]
  ); // index 7 is not included
  const totalNumberOfResults = jobItems?.length || 0; // also a derived state
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;

  // event handlers or actions
  const handleChangePage = useCallback((direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);
  const handleChangeSortBy = useCallback((newSortBy: SortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  }, []);

  const contextValue = useMemo(
    () => ({
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      totalNumberOfResults,
      totalNumberOfPages,
      currentPage,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    }),
    [
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      totalNumberOfResults,
      totalNumberOfPages,
      currentPage,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    ]
  );

  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
