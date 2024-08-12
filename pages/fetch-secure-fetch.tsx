import Image from "next/image";
import { GetServerSideProps } from "next";

interface Resource {
  id: number;
  email: string;
  first_name: string;
  avatar: string;
  pantone_value: string;
}

interface PageProps {
  data: Resource[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetching data from the API
  const response = await fetch("https://reqres.in/api/users?page=2");

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const result = await response.json();

  return {
    props: {
      data: result.data,
    },
  };
};

const ServerSidePropsFetchExample = ({ data }: PageProps) => {
  return (
    <div>
      <h1>Server Side Props Example with Fetch</h1>
      <ul>
        {data.map((resource) => (
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

export default ServerSidePropsFetchExample;
