
import PayslipPDFViewer from "./ReactPdf";
import { Suspense } from "react";
export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>

      <PayslipPDFViewer/>
    </Suspense>
  );
}
