import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { PDFFile } from "./App";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export const PdfDocument = ({ file }: { file: PDFFile }) => {
  const [numPages, setNumPages] = useState<number>();

  // TODO: use parameter type from pdf.js
  const onDocumentLoadSuccess = ({
    numPages: nextNumPages,
  }: {
    numPages: number;
  }): void => {
    setNumPages(nextNumPages);
  };

  return (
    <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
      {Array.from(new Array(numPages), (_el, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          // width={
          //   containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
          // }
        />
      ))}
    </Document>
  );
};
