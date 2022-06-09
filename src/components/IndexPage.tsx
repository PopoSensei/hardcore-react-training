import { FC, useDeferredValue, useEffect, useMemo, useState } from "react";
import { DuckType } from "../services/duck";
import { cleanse } from "../services/instance";
import useStore from "../services/store";
import Button from "./Button";
import DuckList from "./DuckList";
import HireDuckForm from "./HireDuckForm";
import Input from "./Input";

const isGood = (duck: DuckType) => {
  if (duck.age >= 10) {
    return false;
  }
  if (duck.gender === 1) {
    return true;
  }
};

const IndexPage: FC = () => {
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const ducksMap = useStore((state) => state.ducks);
  const fireDuck = useStore((state) => state.fireDuck);
  const hireDuck = useStore((state) => state.hireDuck);

  const [filter, setFilter] = useState<string>("");

  const ducks = useMemo(() => Object.values(ducksMap), [ducksMap]);

  const deferredFilter = useDeferredValue(filter);

  const filteredDucks = useMemo(
    () =>
      ducks.filter((d) => {
        if (deferredFilter === "") {
          return true;
        }
        return d.lastName.toLowerCase().includes(deferredFilter);
      }),
    [deferredFilter, ducks]
  );

  const goodDucks = useMemo(
    () => filteredDucks.filter(isGood),
    [filteredDucks]
  );
  const badDucks = useMemo(
    () => filteredDucks.filter((d) => !isGood(d)),
    [filteredDucks]
  );

  useEffect(() => {
    const i = setInterval(() => {
      // Tila haetaan funkkarina, joten se on aina ajankohtainen
      setSecondsElapsed((s) => s + 1);
    }, 1000);
    return () => {
      clearInterval(i);
    };
  }, []);
  return (
    <section>
      <Button
        onClick={() => {
          cleanse();
        }}
      >
        puhdista
      </Button>

      <HireDuckForm hireDuck={hireDuck} />

      <h2>Etusivu</h2>

      <p>
        Sekunteja elämästä kulunut: <strong>{secondsElapsed}</strong>
      </p>

      <fieldset>
        <legend>haku</legend>
        <Input
          type="text"
          onChange={(e) => {
            setFilter(e.currentTarget.value);
          }}
        />
      </fieldset>

      <hr />
      <DuckList
        ducks={badDucks}
        fireDuck={fireDuck}
        title="Pahat ankat"
        showMetadata
      />
      <DuckList
        ducks={goodDucks}
        fireDuck={fireDuck}
        // titleRenderer={({ title }) => <h2>{title}</h2>}
        title="Hyvät ankat"
      />
    </section>
  );
};

export default IndexPage;
