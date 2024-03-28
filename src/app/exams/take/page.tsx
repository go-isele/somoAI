import PDFViewer2 from "@/components/common/pdf/pdfViewer";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Take Exam | SomoCloud",
  description: "SomoCloud powered somoAI for schools and students",
};

const App = () => {
  const pdfUrl = "/documents/create-course.pdf"; // URL of your PDF file

  return (
    <DefaultLayout>
      <div>
        {/* Call PDFViewer2 component and pass pdfUrl as a prop */}
        <PDFViewer2 file={pdfUrl} />
      </div>
    </DefaultLayout>
  );
};

export default App;
