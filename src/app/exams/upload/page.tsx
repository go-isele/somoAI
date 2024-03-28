import PDFViewer2 from "@/components/common/pdf/pdfViewer";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";
import UploadExam from "@/components/common/pdf/UploadDocument";

export const metadata: Metadata = {
  title: "Upload Exam | SomoCloud",
  description: "SomoCloud powered somoAI for schools and students",
};

const TakeExamComponent = () => {
  const pdfUrl = "/documents/create-course.pdf"; // URL of your PDF file

  return (
    <DefaultLayout>
      <div>
        {/* Call PDFViewer2 component and pass pdfUrl as a prop */}
        <UploadExam />
      </div>
    </DefaultLayout>
  );
};

export default TakeExamComponent;
