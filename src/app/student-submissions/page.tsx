import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

export const metadata: Metadata = {
  title: "Teacher somoAI | SomoCloud",
  description: "SomoCloud powered somoAI for schools and students",
};

const FormLayout = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Student Submissions" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <TableThree />
        <TableTwo />
      </div>
    </DefaultLayout>
  );
};

export default FormLayout;
