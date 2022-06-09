import {
  FC,
  ReactNode,
  useEffect,
  useState,
  useCallback,
  useMemo
} from "react";
import {
  DuckType,
  getDucks,
  fireDuck as fireDuckServ,
  hireDuck as hireDuckServ,
  DuckProspectType
} from "../services/duck";
import { cleanse } from "../services/instance";
import DuckList from "./DuckList";
import HireDuckForm from "./HireDuckForm";

type Props = {
  children: ReactNode;
};

const onCleanse = async () => await cleanse();

const App: FC = (props) => {
  const [ducks, setDucks] = useState<DuckType[]>([]);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  const fireDuck = useCallback(
    async (id: string) => {
      const fired = await fireDuckServ(id);
      setDucks((ducks) => {
        return ducks.filter((d) => d.id !== fired.id);
      });
    },
    [setDucks]
  );

  const hireDuck = useCallback(
    async (prospect: DuckProspectType) => {
      const hired = await hireDuckServ(prospect);
      setDucks((ducks) => {
        return ducks.concat(hired);
      });
    },
    [setDucks]
  );

  const isGood = (duck: DuckType) => {
    if (duck.age >= 10) {
      return false;
    }
    if (duck.gender === 1) {
      return true;
    }
  };

  const goodDucks = useMemo(() => ducks.filter(isGood), [ducks]);
  const badDucks = useMemo(() => ducks.filter((d) => !isGood(d)), [ducks]);

  useEffect(() => {
    const i = setInterval(() => {
      // Tila haetaan funkkarina, joten se on aina ajankohtainen
      setSecondsElapsed((s) => s + 1);
    }, 1000);
    return () => {
      clearInterval(i);
    };
  }, []);

  // Hookkien säännöt
  useEffect(() => {
    console.log("Tyhjää kutsutaan joka kerta");
  });

  useEffect(() => {
    console.log("Tämä suoritetaan aina kun Ankat muuttuu");
  }, [ducks]);

  useEffect(() => {
    // Is this the real life or is this just fantasy
    getDucks().then((ducks) => {
      console.log("Fetched da ducks");
      setDucks(ducks);
    });
  }, []);

  return (
    <main>
      <button
        onClick={() => {
          onCleanse;
        }}
      >
        Reset Dux
      </button>
      <h1>Duck Erp 1000000</h1>

      <HireDuckForm hireDuck={hireDuck} />

      <h2>Etusivu</h2>

      <p>
        Sekunteja elämästä kulunut: <strong>{secondsElapsed}</strong>
      </p>

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
    </main>
  );
};

export default App;
