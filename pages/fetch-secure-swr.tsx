import Image from "next/image";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const SecureFetchExample = () => {
  const { data, error, isLoading } = useSWR("/api/secure-data", fetcher);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Secure Fetch Example with SWR</h1>
      <ul>
        {data.data.map((resource: any) => (
          <li key={resource.id}>
            <Image
              src={resource.avatar}
              width={50}
              height={50}
              alt={resource.first_name}
            />
            {resource.email} ({resource.id}) - Pantone: {resource.pantone_value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SecureFetchExample;
