"use client";
import React from "react"; // Import React and useState
import Link from "next/link";

const TakeExam = () => {
  return (
    <>
      <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          <Link
            href="/exams/take"
            className="text-green-500 hover:text-green-700"
          >
            Take Exam
          </Link>
        </h3>
      </div>
    </>
  );
};

export default TakeExam; // Export the component
