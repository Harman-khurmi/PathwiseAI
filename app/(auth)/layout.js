import React from "react";

const layout = ({ children }) => {
  return (
    <div className="flex justify-center pt-32 pb-12 min-h-screen">
      {children}
    </div>
  );
};

export default layout;
