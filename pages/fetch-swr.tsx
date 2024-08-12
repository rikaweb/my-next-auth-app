import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SWRExample = () => {
  const { data, error, isLoading } = useSWR(
    "https://reqres.in/api/unknown",
    fetcher
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>SWR Example</h1>
      <ul>
        {data.data.map((resource: any) => (
          <li key={resource.id} style={{ backgroundColor: resource.color }}>
            {resource.name} ({resource.year}) - Pantone:{" "}
            {resource.pantone_value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SWRExample;
