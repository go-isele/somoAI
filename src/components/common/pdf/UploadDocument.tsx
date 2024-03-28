"use client";
import React, { useState, ChangeEvent } from "react";
import axios from "axios";

const UploadExam: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const uploadExamDocument = async () => {
    try {
      if (!selectedFile) {
        console.error("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append("document", selectedFile);

      await axios.post("/api/upload-exam-document/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Optionally, you can handle success here, e.g., show a success message
      console.log("Exam document uploaded successfully");
    } catch (error) {
      // Handle errors here, e.g., display an error message
      console.error("Error uploading exam document:", error);
    }
  };

  return (
    <>
      <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">Take Exam</h3>
        <input type="file" onChange={handleFileChange} className="mt-2" />
        <button
          onClick={uploadExamDocument}
          className="mt-2 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600"
        >
          Upload Exam Document
        </button>
      </div>
    </>
  );
};

export default UploadExam;
