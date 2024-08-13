import type { RouteObject } from "react-router-dom";
import type { DefaultComponent } from "@loadable/component";
import { useEffect } from "react";
import { handleRoutes } from "./utils/helper";
import { useLocation, useRoutes } from "react-router-dom";
import Layout from '@/layouts';
import Login from '@/pages/login';
import NotFound from '@/pages/404';
import nprogress from 'nprogress';

type PageFiles = Record<string, () => Promise<DefaultComponent<unknown>>>;
const pages = import.meta.glob('../pages/**/*.tsx') as PageFiles;
const layouts = handleRoutes(pages);

const newRoutes: RouteObject[] = [
  {
    path: "login",
    element: <Login />
  },
  {
    path: "",
    element: <Layout />,
    children: layouts
  },
  {
    path: "*",
    element: <NotFound />,
  }
];

function App() {
  const location = useLocation();

  // 顶部进度条
  useEffect(() => {
    nprogress.start();
  }, []);

  useEffect(() => {
    nprogress.done();

    return () => {
      nprogress.start();
    };
  }, [location]);

  return (
    <>
      { useRoutes(newRoutes) }
    </>
  );
}

export default App;
