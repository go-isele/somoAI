import { BRAND } from "@/types/brand";
import Image from "next/image";

const brandData: BRAND[] = [
  {
    logo: "/favicon.ico",
    name: "Mathematics",
    marks: 95,
    grade: "A",
    improvement: "Good",
    position: 1,
  },
  {
    logo: "/favicon.ico",
    name: "English",
    marks: 60,
    grade: "B",
    improvement: "Average",
    position: 2,
  },
  {
    logo: "/favicon.ico",
    name: "Kiswahili",
    marks: 65,
    grade: "B",
    improvement: "Average",
    position: 3,
  },
  {
    logo: "/favicon.ico",
    name: "Chemistry",
    marks: 55,
    grade: "C",
    improvement: "Below Average",
    position: 4,
  },
  {
    logo: "/favicon.ico",
    name: "CRE",
    marks: 85,
    grade: "A",
    improvement: "Good",
    position: 5,
  },
];

const TableOne = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        My Subjects/Courses
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Subject
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Marks
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Grade
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Improvement
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Position
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <Image src={brand.logo} alt="Brand" width={38} height={38} />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {brand.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.marks}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{brand.grade}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.improvement}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">{brand.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
