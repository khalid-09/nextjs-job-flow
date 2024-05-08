import { Metadata } from "next";
import NewJobForm from "./NewJobForm";

export const metadata: Metadata = {
  title: "Post a new Job",
};

const Page = () => {
  return <NewJobForm />;
};

export default Page;
