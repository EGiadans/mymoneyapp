import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfExtractor: React.FC = () => {
  const [matches, setMatches] = useState([]);

  const handleFile = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = async () => {
      // @ts-expect-error TODO
      const typedArray = new Uint8Array(fileReader.result);
      const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const strings = content.items.map((item) => item.str);
        fullText += strings.join(" ") + "\n";
      }

      // 🔍 Example: Find all lines with "pagos recurrentes"
      const regex = /pagos recurrentes.*?\n/gi;
      const found = fullText.match(regex) || [];

      // @ts-expect-error TODO: Define this type
      setMatches(found);
    };

    fileReader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={handleFile} />
      <h3>Results:</h3>
      <pre>{matches.join("\n")}</pre>
    </div>
  );
};

export default PdfExtractor;
