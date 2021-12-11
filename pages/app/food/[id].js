import Image from "next/image";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const Food = ({ food }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={food.image}
        alt={food.name}
        width="900px"
        height="400px"
        objectFit="cover"
      />
      <h1 className="font-extrabold text-7xl">{food.name}</h1>
      <h2 className="font-bold text-3xl">{food.place}</h2>
      <div className="w-2/3 container" dangerouslySetInnerHTML={{ __html: food.description }}></div>
      <iframe
        width="900"
        height="400"
        src={`https://www.youtube.com/embed/${
          food.youtube.split("https://www.youtube.com/watch?v=")[1]
        }`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  withPageAuthRequired();
  const res = await fetch(process.env.AUTH0_BASE_URL + "/api/data");
  const foods = await res.json();
  const { id } = context.query;
  const food = foods.filter((n) => n.key === id)[0];

  return {
    props: {
      food,
    },
  };
};

export default Food;
