import { FC } from "react";
import { useParams } from "react-router";
import useStore from "../services/store";

type Props = {};

const DuckPage: FC<Props> = () => {
  const { id } = useParams<{ id: string }>();
  const duck = useStore((state) => state.ducks[id as string]);
  if (!duck) {
    return <span>Ankkaa ei löydetty</span>;
  }
  return (
    <section>
      <h2>
        {duck.lastName}, {duck.firstName}
      </h2>
      <p>Surullinen elämäntarina</p>
    </section>
  );
};

export default DuckPage;
