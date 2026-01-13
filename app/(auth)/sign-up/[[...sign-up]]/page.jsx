import { SignUp } from "@clerk/nextjs";
import React from "react";

const Page = () => {
  return <SignUp routing="path" path="/sign-up" />;
};

export default Page;
