import { FC, useEffect, useRef } from "react";
import { Outlet } from "react-router";
import { Spinner } from "theme-ui";
import useStore from "../services/store";
import { mainClass, spinnerClass } from "./App.css";
import MediaPlayer from "./MediaPlayer";

const App: FC = () => {
  const getDucks = useStore((state) => state.getDucks);
  const isLoading = useStore((state) => state.loadingCounter > 0);
  const isInitialized = useStore((state) => state.isInitialized);

  const ref = useRef<HTMLMediaElement>(null);
  console.log(ref, "ref");

  const Component = isInitialized
    ? Outlet
    : () => <span>Hold yer horsies!</span>;

  useEffect(() => {
    // Is this the real life or is this just fantasy
    // TODO: works very wrong
    getDucks();
  }, [getDucks]);

  return (
    <main className={mainClass}>
      {isLoading && <Spinner className={spinnerClass} />}
      <h1>Duck Erp 1000000</h1>

      <MediaPlayer ref={ref} />
      <button
        onClick={() => {
          ref.current?.play();
        }}
      >
        soita video
      </button>

      <Component />
    </main>
  );
};

export default App;
