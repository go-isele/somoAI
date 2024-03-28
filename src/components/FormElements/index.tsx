"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import axios, { AxiosResponse } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

const FormElements = () => {
  const [subject, setSubjectName] = useState("");
  const [date, setDate] = useState("");
  const [score, setScore] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // Define a custom type for API error responses
  interface ApiErrorResponse {
    error: string; // Assuming a simple error message structure
  }

  const handleCreateExam = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken"); // Replace with your token access logic

    try {
      const response: AxiosResponse<any> = await axios.post(
        "http://127.0.0.1:8000/api/exam/",
        {
          subject: subject,
          date: date,
          score: score,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 201) {
        setAlertMessage("Exam created successfully!");
        setSubjectName("");
        setDate("");
        setScore("");
      } else {
        console.error("Unexpected response status:", response.status);
        throw new Error("Failed to create exam"); // Re-throw for general error handling
      }
    } catch (error: any) {
      // Catch any error type
      try {
        const parsedApiError: ApiErrorResponse = error.response.data; // Attempt to parse API error response
        setAlertMessage("Error creating exam: " + parsedApiError.error);
      } catch (parseError) {
        console.error("Error parsing API error response:", parseError);
        setAlertMessage("Error creating exam: An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <Breadcrumb pageName="Create Subject" />
      {alertMessage && (
        <div
          className="border-b border-t border-blue-500 bg-blue-100 px-4 py-3 text-blue-700"
          role="alert"
        >
          <p className="font-bold">Information</p>
          <p className="text-sm">{alertMessage}</p>
        </div>
      )}

      <form onSubmit={handleCreateExam}>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            {/* Input Fields */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Create Subject
                </h3>
              </div>
              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Subject Name
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="e.g Mathematics"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={subject}
                    onChange={(e) => setSubjectName(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="date"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Exam Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    placeholder="e.g date of exam"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="score"
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                  >
                    Exam Score
                  </label>
                  <input
                    type="number"
                    id="score"
                    name="score"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    placeholder="e.g date of exam"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2.5 bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  >
                    <span>
                      <svg
                        className="fill-current"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* SVG Path */}
                      </svg>
                    </span>
                    Create Subject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormElements;
