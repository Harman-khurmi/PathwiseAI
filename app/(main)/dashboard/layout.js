import React, { Suspense } from "react";
import { BarLoader } from "react-spinners";

const Layout = ({ children }) => {
  return (
    <div className="px-5">
      <div className="flex items-center justify-center mb-5">
        <h1 className="text-5xl font-bold ">Industry Insights</h1>
      </div>
      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#36d7b7" />}
      >
        {children}
      </Suspense>
    </div>
  );
};

export default Layout;
