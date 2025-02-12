import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import BookmarksButton from "./BookmarksButton";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import { useDebounce, useJobItems } from "../lib/hooks";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { SortBy } from "../lib/types";

function App() {
  // state
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");
  console.log(sortBy);

  const jobItemsSorted =
    jobItems?.sort((a, b) => {
      if (sortBy === "relevant") {
        return b.relevanceScore - a.relevanceScore;
      } else {
        return a.daysAgo - b.daysAgo;
      }
    }) || [];
  // derived state
  const jobItemsSortedAndSliced = jobItemsSorted.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  ); // index 7 is not included
  const totalNumberOfResults = jobItems?.length || 0; // also a derived state
  const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;

  // event handlers or actions
  const handleChangePage = (direction: "next" | "previous") => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const handleChangeSortBy = (newSortBy: SortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalNumberOfResults={totalNumberOfResults} />
            <SortingControls sortBy={sortBy} onClick={handleChangeSortBy} />
          </SidebarTop>

          <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />
          <PaginationControls
            currentPage={currentPage}
            totalNumberOfPages={totalNumberOfPages}
            onClick={handleChangePage}
          />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />

      <Toaster position="top-right" />
    </>
  );
}

export default App;
