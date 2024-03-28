"use client";
import React from "react"; // Import React and useState
import Link from "next/link";

const TakeExam = () => {
  // Add missing function declaration and curly braces

  return (
    <>
      <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          <Link href="/exams/take">Take Exam</Link>
        </h3>
      </div>
    </>
  );
};

export default TakeExam; // Export the component
