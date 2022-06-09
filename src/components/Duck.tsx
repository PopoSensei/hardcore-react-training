import { FC, memo } from "react";
import { DuckType } from "../services/duck";

import cx from "clsx";

import { duckClass, femaleClass, maleClass } from "./duck.css";
import Button from "./Button";
import { Link } from "react-router-dom";

type Props = {
  duck: DuckType;
  fireDuck: (id: string) => void;
};

const Duck: FC<Props> = ({ duck, fireDuck }) => {
  const classes = cx(duckClass, {
    [maleClass]: duck.gender === 0,
    [femaleClass]: duck.gender === 1
  });

  return (
    <li className={classes}>
      <div>
        <div>
          <Link to={`/duck/${duck.id}`}>
            <strong>{duck.lastName}</strong>, {duck.firstName} (
            {duck.age.toFixed(2)} y.)
          </Link>
        </div>

        <div>
          <Button
            disabled={duck.isBeingFired}
            onClick={() => {
              fireDuck(duck.id);
            }}
          >
            vapauta
          </Button>
        </div>
      </div>
    </li>
  );
};

export default memo(Duck);
