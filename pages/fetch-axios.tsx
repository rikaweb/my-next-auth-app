import { useEffect, useState } from "react";
import axios from "axios";

interface Resource {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}

const AxiosExample = () => {
  const [data, setData] = useState<Resource[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://reqres.in/api/unknown");

        setData(response.data.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Axios Example</h1>
      <ul>
        {data.map((resource) => (
          <li key={resource.id} style={{ backgroundColor: resource.color }}>
            {resource.name} ({resource.year}) - Pantone:{" "}
            {resource.pantone_value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AxiosExample;
