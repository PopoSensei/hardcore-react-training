import { FC, StrictMode, lazy, Suspense, ReactNode } from "react";
import App from "./components/App";

import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const IndexPage = lazy(() => import("./components/IndexPage"));
const DuckPage = lazy(() => import("./components/DuckPage"));

type lazyPageProps = {
  children: ReactNode;
};

const LazyPage: FC<lazyPageProps> = ({ children }) => {
  return (
    <Suspense fallback={<span>Hold yer horsies!</span>}>{children}</Suspense>
  );
};

const Root: FC = () => {
  // All React components must return one thing. A fragment (the empty tag <>) is such "one thing" that has no markup.
  return (
    <>
      <StrictMode>
        <BrowserRouter>
          <ErrorBoundary
            onError={(e) => {
              console.log("ERROR FATALE", e);
              // Send error to sentry etc.
            }}
            fallbackRender={(props) => {
              return <h1>OH NOEWS! 404 MULTIFAIL</h1>;
            }}
          >
            <Routes>
              <Route path="/" element={<App />}>
                <Route
                  index
                  element={
                    <LazyPage>
                      <IndexPage />
                    </LazyPage>
                  }
                />
                <Route
                  path="/duck/:id"
                  element={
                    <LazyPage>
                      <DuckPage />
                    </LazyPage>
                  }
                />
              </Route>
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </StrictMode>
    </>
  );
};

export default Root;
