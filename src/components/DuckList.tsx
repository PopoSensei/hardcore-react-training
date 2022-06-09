import { FC, memo } from "react";
import { DuckType } from "../services/duck";
import Duck from "./Duck";
import { ascend, sortWith, prop } from "ramda";

type Props = {
  ducks: DuckType[];
  fireDuck: (id: string) => void;
  title: string;
  showMetadata?: boolean;
  // titleRenderer: ({ title }: { title: string }) => ReactElement;
};

const duckSort = sortWith<DuckType>([
  ascend(prop("lastName")),
  ascend(prop("firstName"))
]);

const DuckList: FC<Props> = ({
  ducks,
  fireDuck,
  title,
  showMetadata = false
}) => {
  // const TitleRenderer = titleRenderer;

  const avgAge = ducks.reduce((acc, duck) => acc + duck.age, 0) / ducks.length;

  const sortedDucks = duckSort(ducks);

  return (
    <>
      {/* <TitleRenderer title={title} /> */}
      <h3>{title}</h3>

      {showMetadata && (
        <p>
          Ankkoja listalla: {ducks.length}. Keskikä: {avgAge.toFixed(2)}
        </p>
      )}
      <ul>
        {sortedDucks.map((duck) => {
          return <Duck fireDuck={fireDuck} key={duck.id} duck={duck} />;
        })}
      </ul>
    </>
  );
};

export default memo(DuckList);
