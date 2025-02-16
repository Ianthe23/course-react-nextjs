import { useJobItemsContext } from "../lib/hooks";
import JobList from "./JobList";

export default function JobListData() {
  const { jobItemsSortedAndSliced, isLoading } = useJobItemsContext();

  return <JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />;
}
