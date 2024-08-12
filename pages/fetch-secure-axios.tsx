import Image from "next/image";
import axios from "axios";
import { GetStaticProps } from "next";

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

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get("https://reqres.in/api/users?page=2");

  return {
    props: {
      data: response.data.data,
    },
    revalidate: 60, // Revalidate the page every 60 seconds
  };
};

const StaticPropsAxiosExample = ({ data }: PageProps) => {
  return (
    <div>
      <h1>Static Props Example with Axios</h1>
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

export default StaticPropsAxiosExample;
