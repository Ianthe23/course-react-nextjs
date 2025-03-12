import EventsList from "@/components/events-list";
import H1 from "@/components/h1";
import { EventoEvent } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { Suspense } from "react";
import Loading from "./loading";

type EventsTypeProps = {
  params: {
    city: string;
  };
};

export default async function EventsPage({ params }: EventsTypeProps) {
  const city = params.city;

  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
      <H1 className="mb-28">
        {city === "all" && "All events"}
        {city !== "all" &&
          `Events in ${city.charAt(0).toUpperCase() + city.slice(1)}`}
      </H1>

      <Suspense fallback={<Loading />}>
        <EventsList city={city} />
      </Suspense>
    </main>
  );
}
