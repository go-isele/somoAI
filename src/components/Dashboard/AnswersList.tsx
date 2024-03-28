"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const AnswersList: React.FC = () => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [selectedExamId, setSelectedExamId] = useState<number | null>(null);
  const [markingResponse, setMarkingResponse] =
    useState<MarkingResponse | null>(null);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Access token not found");
        }

        const response = await axios.get<Answer[]>(
          "http://127.0.0.1:8000/api/answer/file/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setAnswers(response.data);
      } catch (error) {
        console.error("Error fetching answers:", error);
      }
    };

    fetchAnswers();
  }, []);

  const handleSelectAnswer = (answerId: number, examId: number) => {
    console.log(answerId, examId);
    setSelectedAnswerId(answerId);
    setSelectedExamId(examId);
  };

  const handleMarking = async () => {
    if (selectedAnswerId === null || selectedExamId === null) {
      console.error("No answer or exam selected.");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Access token not found");
      }

      const response = await axios.post<MarkingResponse>(
        "http://127.0.0.1:8000/api/exam/mark/",
        {
          answer_id: selectedAnswerId,
          exam_id: selectedExamId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setMarkingResponse(response.data);
      console.log("Answer submitted for marking successfully!");
    } catch (error) {
      console.error("Error marking answer:", error);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="mb-4 text-2xl font-bold">Your Uploaded Answers:</h2>
      <ul>
        {answers.map((answer) => (
          <li key={answer.id} className="mb-4 rounded-lg border p-4">
            <div className="mb-2">Answer ID: {answer.id}</div>
            <div className="mb-2">Exam ID: {answer.exam_id}</div>
            <div className="mb-2">
              Uploaded At: {new Date(answer.uploaded_at).toLocaleString()}
            </div>
            <div>
              <img
                src={answer.file_url}
                alt={`Answer ${answer.id}`}
                className="h-auto max-w-full"
              />
            </div>
            <button
              onClick={() => handleSelectAnswer(answer.id, answer.exam_id)}
              className="mt-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Select
            </button>
          </li>
        ))}
      </ul>
      {selectedAnswerId && selectedExamId && (
        <>
          <button
            onClick={handleMarking}
            className="mt-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
          >
            Submit Selected Answer for Marking
          </button>
          {markingResponse && (
            <div className="bg-gray-100 mt-4 rounded p-4">
              <h3 className="mb-2 text-lg font-bold">Marking Response:</h3>
              <div>Marks: {markingResponse.marks}</div>
              <div>Feedback: {markingResponse.feedback}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AnswersList;
