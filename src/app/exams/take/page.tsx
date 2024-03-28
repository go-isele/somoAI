import PDFViewer2 from "@/components/common/pdf/pdfViewer";

const App = () => {
  const pdfUrl = "https://example.com/path/to/your/pdf/file.pdf"; // URL of your PDF file

  return (
    <div>
      {/* Call PDFViewer2 component and pass pdfUrl as a prop */}
      <PDFViewer2 pdfPath={pdfUrl} />
    </div>
  );
};

export default App;
