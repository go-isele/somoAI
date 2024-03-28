"use client";
import { useState, useRef, ChangeEvent } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

type Annotation = {
  page: number;
  text: string;
};

type PDFViewer2Props = {
  pdfPath: string;
};

const PDFViewer2: React.FC<PDFViewer2Props> = ({ pdfPath }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [annotationText, setAnnotationText] = useState<string>("");
  const annotationInputRef = useRef<HTMLInputElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const handleAnnotationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnnotationText(e.target.value);
  };

  const addAnnotation = () => {
    if (!annotationText.trim()) return;
    setAnnotations([
      ...annotations,
      { page: pageNumber, text: annotationText },
    ]);
    setAnnotationText("");
    if (annotationInputRef.current) {
      annotationInputRef.current.value = "";
    }
  };

  return (
    <div className="mx-auto w-full max-w-screen-lg p-4">
      <div className="mb-4 flex justify-center space-x-4">
        <button
          onClick={() => setPageNumber((prevPage) => Math.max(1, prevPage - 1))}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Previous Page
        </button>
        <button
          onClick={() =>
            setPageNumber((prevPage) => Math.min(numPages || 1, prevPage + 1))
          }
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Next Page
        </button>
        <button
          onClick={() => setScale((prevScale) => Math.min(2, prevScale + 0.1))}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Zoom In
        </button>
        <button
          onClick={() =>
            setScale((prevScale) => Math.max(0.5, prevScale - 0.1))
          }
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Zoom Out
        </button>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Add annotation..."
          onChange={handleAnnotationChange}
          ref={annotationInputRef}
          className="w-2/3 rounded border px-4 py-2 focus:outline-none"
        />
        <button
          onClick={addAnnotation}
          className="rounded bg-indigo-500 px-4 py-2 text-white hover:bg-indigo-600"
        >
          Add Annotation
        </button>
      </div>
      <Document file={pdfPath} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} width={600 * scale} />
        {annotations.map((annotation, index) =>
          annotation.page === pageNumber ? (
            <div
              key={index}
              style={{
                position: "absolute",
                top: 100,
                left: 100,
                background: "yellow",
              }}
            >
              {annotation.text}
            </div>
          ) : null,
        )}
      </Document>
    </div>
  );
};

export default PDFViewer2;
