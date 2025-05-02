import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { PdfDocument } from "./PdfDocument";
import { TextField } from "@mui/material";

export type PDFFile = string | File | null;

function App() {
  const [file, setFile] = useState<PDFFile>("./sample.pdf");

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { files } = event.target;

    const nextFile = files?.[0];

    if (nextFile) {
      setFile(nextFile);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>
        <label htmlFor="file">Load from file:</label>{" "}
        <TextField onChange={onFileChange} type="file" />
      </div>
      <PdfDocument file={file} />
    </>
  );
}

export default App;
