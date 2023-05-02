import React, { useState } from "react";
import { read, utils } from "xlsx";
import _ from "lodash";
import backgroundImage from './ofppt3.png';


import "bootstrap/dist/css/bootstrap.min.css";

const ExcelUpload = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [diff, setDiff] = useState(null);

  const handleFile1Change = (event) => {
    setFile1(event.target.files[0]);
  };

  const handleFile2Change = (event) => {
    setFile2(event.target.files[0]);
  };

  const handleCompare = () => {
    const reader1 = new FileReader();
    reader1.onload = (event) => {
      const data1 = new Uint8Array(event.target.result);
      const workbook1 = read(data1, { type: "array" });
      const sheetName1 = workbook1.SheetNames[0];
      const sheetData1 = utils.sheet_to_json(workbook1.Sheets[sheetName1]);

      const reader2 = new FileReader();
      reader2.onload = (event) => {
        const data2 = new Uint8Array(event.target.result);
        const workbook2 = read(data2, { type: "array" });
        const sheetName2 = workbook2.SheetNames[0];
        const sheetData2 = utils.sheet_to_json(workbook2.Sheets[sheetName2]);

        const differences = _.differenceWith(sheetData1, sheetData2, _.isEqual);

        setDiff(differences);
      };
      reader2.readAsArrayBuffer(file2);
    };
    reader1.readAsArrayBuffer(file1);
  };

  return (
    <div className="container mt-5"
    //   style={{
    //   backgroundImage: `url(${backgroundImage})`,
    //   backgroundSize: 'cover',
    //   backgroundPosition: '50% 50%',
    //   minHeight: '100vh',
    // }}
    // 
    >
      <h1 className="mb-4">Excel Compare</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="fileInput1">Select Excel File 1</label>
            <input
              type="file"
              className="form-control-file"
              id="fileInput1"
              onChange={handleFile1Change}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="fileInput2">Select Excel File 2</label>
            <input
              type="file"
              className="form-control-file"
              id="fileInput2"
              onChange={handleFile2Change}
            />
          </div>
        </div>
      </div>
      <button
        className="btn btn-primary"
        onClick={handleCompare}
        disabled={!file1 || !file2}
      >
        Compare
      </button>
      {diff && (
        <div className="mt-4">
          <h2>Differences:</h2>
          {diff.length > 0 ? (
            <table className="table mt-4">
              <thead>
                <tr>
                  {Object.keys(diff[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {diff.map((row, index) => (
                  <tr key={index}>
                    {Object.keys(row).map((key) => (
                      <td key={key}>{row[key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No differences found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ExcelUpload;
