
import PayslipPDFViewer from "./ReactPdf";
// import PayslipPDFViewer from "./payslip";

import { Suspense } from "react";
export default function Home() {
  return (
    // <Suspense fallback={<div>Loading...</div>}>

    //   <PayslipPDFViewer/>
    // </Suspense>
       <div>
      <h1>Payslip Generator</h1>
      <PayslipPDFViewer />
    </div>
  );
}
