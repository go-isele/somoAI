"use client";
import React, { ChangeEvent, useState } from "react";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import axios, { AxiosResponse } from "axios";
import ExamModal from "@/components/Modals/ExamModal";

interface ApiResponse {
  status: string;
  message: string;
}

const StudentSubmitAssignment: React.FC = () => {
  // Sample Markdown content for the exam
  const markdownContent = `
        # Exam Content
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
    `;

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [parsedResults, setParsedResults] = useState<ApiResponse | null>(null);

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedOption || !selectedFile) {
      alert("Please select an exam and choose a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("exam_id", selectedOption);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Access token not found");
      }

      const response: AxiosResponse<ApiResponse> = await axios.post(
        "http://127.0.0.1:8000/api/answer/file/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setParsedResults(response.data);
      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading. Please try again.");
    } finally {
    }
  };

  const handleSubmit = async () => {
    await handleUpload();
  };

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Select Subject
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <label
            htmlFor="exams"
            className="text-gray-700 block text-sm font-medium"
          >
            Select Exam
          </label>
          <select
            id="exams"
            name="exams"
            value={selectedOption}
            onChange={handleOptionChange}
            className="border-gray-300 mt-1 block w-full rounded-md border bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select...</option>
            <option value="1">Mathematics</option>
            <option value="3">English</option>
            <option value="4">Social</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Upload Assignment
            </h3>
          </div>
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Attach file
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="inline-flex items-center justify-center gap-2.5 bg-meta-3 px-10 py-2 text-center font-medium text-white"
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
                  {/* SVG path */}
                </svg>
              </span>
              Submit Assignment
            </button>
          </div>
        </div>
        {parsedResults && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="col-span-1 sm:col-span-2">
              <div className="rounded-lg bg-white shadow-default dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                  <h3 className="text-lg font-medium text-black dark:text-white">
                    Marking Results
                  </h3>
                </div>
                <div className="p-6">
                  <p>Status: {parsedResults.status}</p>
                  <p>Message: {parsedResults.message}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StudentSubmitAssignment;
