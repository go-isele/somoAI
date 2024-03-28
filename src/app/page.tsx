import StudentSubmitAssignment from "@/components/Dashboard/StudentSubmitAssignment";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AnswersList from "@/components/Dashboard/AnswersList";
import TakeExam from "@/components/Dashboard/TakeExam";

export const metadata: Metadata = {
  title: "somoAI | SomoCloud - Modern co-self",
  description: "This is the somoAI assistant for you",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <TakeExam />
        <StudentSubmitAssignment />
        <AnswersList />
      </DefaultLayout>
    </>
  );
}
