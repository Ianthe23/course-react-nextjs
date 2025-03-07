import H1 from "@/app/components/h1";

type EventsTypeProps = {
  params: {
    city: string;
  };
};

export default async function EventsPage({ params }: EventsTypeProps) {
  const city = params.city;

  const response = await fetch(
    "https://bytegrad.com/course-assets/projects/evento/api/events?city=austin"
  );
  const events = await response.json();
  console.log(events);

  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
      <H1>
        {city === "all" && "All events"}
        {city !== "all" &&
          `Events in ${city.charAt(0).toUpperCase() + city.slice(1)}`}
      </H1>

      {events.map((event) => (
        <section key={event.id}>{event.name}</section>
      ))}
    </main>
  );
}
