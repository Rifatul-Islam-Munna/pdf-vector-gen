// components/PayslipPDFViewer.jsx
"use client";

import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from "@react-pdf/renderer";
import { saveAs } from "file-saver"; // For downloading the PDF
import k from "./image.png";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 0,
    fontFamily: "LiberationSans", // Use LiberationSans if available
    fontSize: 8,
  },
  // ... (Rest of the styles are identical to your original code)
  // Top purple section
  topSection: {
    backgroundColor: "#fff",
    height: 280,
    flexDirection: "row",
    border: "2px solid #000",
    borderBottom: "none",
  },
  leftSideText: {
    width: 30,
    backgroundColor: "#D8BFD8",
    justifyContent: "center",
    alignItems: "center",
    borderRight: "2px solid #000",
  },
  privateText: {
    backgroundColor: "#D8BFD8",
    width: "100%",
    height: "100%",
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 9,
    paddingRight: 9,
  },
  topMainContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  employeeInfo: {
    textAlign: "center",
    marginTop: 10,
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  employeeName: {
    fontSize: 11,
    color: "#000",
    marginBottom: 8,
  },
  employeeAddress: {
    fontSize: 10,
    color: "#000",
    lineHeight: 1.4,
    marginBottom: 2,
  },
  returnAddress: {
    fontSize: 8,
    color: "#000",
    lineHeight: 1.3,
    borderTop: "2px solid #000",
    width: "100%",
    paddingTop: 5,
    backgroundColor: "#D8BFD8",
    paddingLeft: 6,
    paddingBottom: 10,
  },
  rightSideStrip: {
    width: 30,
    backgroundColor: "#D8BFD8",
    borderLeft: "2px solid #000",
  },
  mainContent: {
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerRow: {
    flexDirection: "row",
    height: 35,
    border: "3px solid #000",
  },
  headerBox1: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    border: "2px solid #000",
    borderTop: "none",
    borderLeft: "none",
    borderBottom: "none",
    justifyContent: "center",
    paddingLeft: 8,
    paddingVertical: 2,
  },
  headerBox2: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    border: "2px solid #000",
    borderTop: "none",
    borderLeft: "none",
    borderBottom: "none",
    justifyContent: "center",
    paddingLeft: 8,
    paddingVertical: 2,
  },
  headerBox3: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTop: "none",
    borderRight: "none",
    justifyContent: "center",
    paddingLeft: 8,
    paddingVertical: 2,
  },
  secondRow: {
    flexDirection: "row",
    height: 35,
    border: "3px solid #000",
    borderTop: "none",
    marginTop: -1,
  },
  smallBox1: {
    width: 70,
    backgroundColor: "#FFFFFF",
    border: "2.5px solid #000",
    borderTop: "none",
    borderLeft: "none",
    borderBottom: "none",
    justifyContent: "center",
    paddingLeft: 8,
  },
  smallBox2: {
    width: 100,
    backgroundColor: "#FFFFFF",
    border: "2.5px solid #000",
    borderTop: "none",
    borderLeft: "none",
    borderBottom: "none",
    justifyContent: "center",
    paddingLeft: 8,
  },
  smallBox3: {
    width: 50,
    backgroundColor: "#FFFFFF",
    border: "2.5px solid #000",
    borderTop: "none",
    borderLeft: "none",
    borderBottom: "none",
    justifyContent: "center",
    paddingLeft: 8,
  },
  emptySpace: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRight: "2.5px solid #000",
  },
  smallBox4: {
    width: 60,
    backgroundColor: "#FFFFFF",
    border: "2.5px solid #000",
    borderTop: "none",
    borderLeft: "none",
    borderBottom: "none",
    justifyContent: "center",
    paddingLeft: 8,
  },
  smallBox5: {
    width: 100,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingLeft: 8,
  },
  payRow: {
    flexDirection: "row",
    borderTop: "none",
    backgroundColor: "#D8BFD8",
    paddingTop: 8,
  },
  grossPaySection: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  grossPayHeader: {
    backgroundColor: "#000",
    color: "#FFFFFF",
    textAlign: "left",
    paddingVertical: 6,
    fontSize: 9,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
    fontWeight: "bold",
  },
  deductionsSection: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  deductionsHeader: {
    backgroundColor: "#000",
    color: "#FFFFFF",
    textAlign: "left",
    fontSize: 9,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 3,
    paddingBottom: 3,
  },
  payTable: {
    flexDirection: "row",
    height: 180,
    borderTop: "none",
    borderBottom: "none",
    marginTop: -1,
  },
  grossPayColumn1: {
    flex: 2.5,
    flexDirection: "column",
    borderRight: "2px solid #000",
  },
  grossPayColumn2: {
    flex: 1,
    flexDirection: "column",
    borderRight: "2px solid #000",
    backgroundColor: "#fff",
  },
  grossPayColumn3: {
    flex: 1,
    flexDirection: "column",
    borderRight: "2px solid #000",
  },
  grossPayColumn4: {
    flex: 1,
    flexDirection: "column",
    borderRight: "2px solid #000",
    backgroundColor: "#fff",
  },
  deductionColumn1: {
    flex: 2.5,
    flexDirection: "column",
    borderRight: "2px solid #000",
  },
  deductionColumn2: {
    flex: 1,
    flexDirection: "column",
    borderRight: "2px solid #000",
    backgroundColor: "#fff",
  },
  deductionColumn3: {
    flex: 1,
    flexDirection: "column",
  },
  columnHeader: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderBottom: "1px solid #000",
    justifyContent: "center",
  },
  columnContent: {
    backgroundColor: "#D8BFD8",
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 8,
    justifyContent: "flex-start",
  },
  columnContentWhite: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    paddingHorizontal: 6,
    paddingVertical: 8,
    justifyContent: "flex-start",
  },
  totalSection: {
    flexDirection: "row",
    height: 30,
    borderTop: "none",
    marginTop: -1,
  },
  totalRowGross: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 6,
    justifyContent: "center",
    flex: 2.5,
  },
  totalRowGrossUnits: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 6,
    justifyContent: "center",
    flex: 1,
  },
  totalRowGrossRate: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 6,
    justifyContent: "center",
    flex: 1,
  },
  totalRowGrossAmount: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 6,
    justifyContent: "center",
    flex: 1,
  },
  totalRowDeductions: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 6,
    justifyContent: "center",
    flex: 2.5,
  },
  totalRowDeductionsAmount: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 6,
    justifyContent: "center",
    flex: 1,
  },
  totalRowDeductionsYTD: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 6,
    justifyContent: "center",
    flex: 1,
  },
  columnHeaderText: {
    fontSize: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  netPaySection: {
    backgroundColor: "#000",
    color: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 12,
    width: "150px",
    fontWeight: "bold",
    border: "2px solid #000",
  },
  netPayText: {
    marginRight: 20,
    textAlign: "center",
  },
  bottomRow: {
    flexDirection: "row",
    height: 80,
    borderTop: "none",
    paddingTop: 5,
  },
  ytdSection: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRight: "3px solid #000",
  },
  ytdHeader: {
    backgroundColor: "#000",
    color: "#FFFFFF",
    textAlign: "center",
    paddingVertical: 2,
    fontSize: 7,
    fontWeight: "bold",
    borderBottom: "1px solid #000",
  },
  ytdContent: {
    flex: 1,
    flexDirection: "row",
  },
  ytdLabels: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRight: "3px solid #000",
  },
  ytdValues: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  ytdLabelItem: {
    paddingLeft: 8,
    paddingVertical: 2,
    justifyContent: "center",
  },
  ytdValueItem: {
    paddingRight: 8,
    paddingVertical: 2,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  ytdLabelItemLast: {
    paddingLeft: 8,
    paddingVertical: 2,
    justifyContent: "center",
  },
  ytdValueItemLast: {
    paddingRight: 8,
    paddingVertical: 2,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  prevEmploymentSection: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRight: "3px solid #000",
  },
  prevEmploymentHeader: {
    backgroundColor: "#000",
    color: "#FFFFFF",
    textAlign: "center",
    paddingVertical: 2,
    fontSize: 7,
    fontWeight: "bold",
    borderBottom: "1px solid #000",
  },
  prevEmploymentContent: {
    flex: 1,
    flexDirection: "row",
  },
  prevLabels: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRight: "3px solid #000",
  },
  prevValues: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  prevLabelItem: {
    paddingLeft: 8,
    paddingVertical: 2,
    justifyContent: "center",
  },
  prevValueItem: {
    paddingRight: 8,
    paddingVertical: 2,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  prevLabelItemLast: {
    paddingLeft: 8,
    paddingVertical: 2,
    justifyContent: "center",
  },
  prevValueItemLast: {
    paddingRight: 8,
    paddingVertical: 2,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  employerContribSection: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  employerContribHeader: {
    backgroundColor: "#000",
    color: "#FFFFFF",
    textAlign: "center",
    paddingVertical: 6,
    fontSize: 8,
    fontWeight: "bold",
    borderBottom: "1px solid #000",
  },
  contribSubHeader: {
    flexDirection: "row",
    borderBottom: "3px solid #000",
    height: 20,
  },
  contribSubHeaderEmpty: {
    flex: 1,
    borderRight: "3px solid #000",
  },
  contribSubHeaderThis: {
    flex: 1,
    borderRight: "3px solid #000",
    justifyContent: "center",
    alignItems: "center",
  },
  contribSubHeaderYear: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contribContent: {
    flex: 1,
    flexDirection: "row",
  },
  contribLabels: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRight: "3px solid #000",
  },
  contribThisRun: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRight: "3px solid #000",
  },
  contribYearToDate: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contribLabelItem: {
    paddingLeft: 8,
    paddingVertical: 8,
    justifyContent: "center",
  },
  contribThisRunItem: {
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  contribYearItem: {
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 8,
  },
  normalText: {
    fontSize: 8,
  },
  smallText: {
    fontSize: 6,
    fontWeight: 600,
  },
  labelText: {
    fontSize: 6,
    color: "#333",
    marginBottom: 1,
  },
});

// Register LiberationSans font
import { Font } from "@react-pdf/renderer";
Font.register({
  family: "LiberationSans",
  fonts: [
    { src: "/fonts/LiberationSans-Regular.ttf" },
    { src: "/fonts/LiberationSans-Bold.ttf", fontWeight: "bold" },
  ],
});

const PayslipDocument = () => (
  <Document
    title="PaySlips-Monthly-20250617"
    author=""
    creator="Developer Express Inc. DXperience (tm) v23.1.5"
    producer="Developer Express Inc. DXperience (tm) v23.1.5"
    creationDate={new Date("2025-06-17T13:05:14Z")}
    modificationDate={new Date("2025-06-17T13:05:14Z")}
  >
    <Page size="A4" style={styles.page}>
      {/* Top purple section */}
      <View style={styles.topSection}>
        <View style={styles.leftSideText}>
          <Image src={k.src} style={styles.privateText} />
        </View>
        <View style={styles.topMainContent}>
          <View style={styles.employeeInfo}>
            <Text style={styles.employeeName}>Jhon Doe</Text>
            <Text style={styles.employeeAddress}>15 Lupton Road</Text>
            <Text style={styles.employeeAddress}>Sheffield South Yorkshire S8 7ND</Text>
          </View>
          <Text style={styles.returnAddress}>
            If undelivered, please return to :-{"\n"}
            International House 46 The Priory Queensway, Birmingham West Midlands B4 7LR
          </Text>
        </View>
        <View style={styles.rightSideStrip}></View>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.headerRow}>
          <View style={styles.headerBox1}>
            <Text style={styles.labelText}>Employer</Text>
            <Text style={styles.headerText}>MAJOR PRECINCT LIMITED</Text>
          </View>
          <View style={styles.headerBox2}>
            <Text style={styles.labelText}>Employee</Text>
            <Text style={styles.headerText}>11308456 Jhon Doe</Text>
          </View>
          <View style={styles.headerBox3}>
            <Text style={styles.labelText}>Department</Text>
            <Text style={styles.headerText}>MAJOR PRECINCT LIMITED</Text>
          </View>
        </View>
        <View style={styles.secondRow}>
          <View style={styles.smallBox1}>
            <Text style={styles.labelText}>Tax Code</Text>
            <Text style={styles.normalText}>1257L</Text>
          </View>
          <View style={styles.smallBox2}>
            <Text style={styles.labelText}>NI Number</Text>
            <Text style={styles.normalText}>NA207016D</Text>
          </View>
          <View style={styles.smallBox3}>
            <Text style={styles.labelText}>Basis</Text>
            <Text style={styles.normalText}>A</Text>
          </View>
          <View style={styles.emptySpace}>
            <Text style={styles.labelText}>Tax Reference</Text>
          </View>
          <View style={styles.smallBox4}>
            <Text style={styles.labelText}>Pay Period</Text>
            <Text style={styles.normalText}>M3</Text>
          </View>
          <View style={styles.smallBox5}>
            <Text style={styles.labelText}>Payment Date</Text>
            <Text style={styles.normalText}>17/06/2025</Text>
          </View>
        </View>
        <View style={styles.payRow}>
          <View style={styles.grossPaySection}>
            <View style={{ backgroundColor: "#fff", border: "2px solid #000", alignItems: "flex-start" }}>
              <Text style={styles.grossPayHeader}>GROSS PAY</Text>
            </View>
            <View style={styles.payTable}>
              <View style={[styles.grossPayColumn1, { borderLeft: "2px solid #000" }]}>
                <View style={styles.columnHeader}>
                  <Text style={styles.columnHeaderText}>Description</Text>
                </View>
                <View style={styles.columnContent}>
                  <Text style={styles.normalText}>Hourly Pay</Text>
                </View>
              </View>
              <View style={styles.grossPayColumn2}>
                <View style={styles.columnHeader}>
                  <Text style={styles.columnHeaderText}>Units</Text>
                </View>
                <View style={styles.columnContentWhite}>
                  <Text style={styles.normalText}>208.00</Text>
                </View>
              </View>
              <View style={styles.grossPayColumn3}>
                <View style={styles.columnHeader}>
                  <Text style={styles.columnHeaderText}>Rate(£)</Text>
                </View>
                <View style={styles.columnContent}>
                  <Text style={styles.normalText}>19.59</Text>
                </View>
              </View>
              <View style={styles.grossPayColumn4}>
                <View style={styles.columnHeader}>
                  <Text style={styles.columnHeaderText}>Amount(£)</Text>
                </View>
                <View style={styles.columnContentWhite}>
                  <Text style={styles.normalText}>4075.00</Text>
                </View>
              </View>
            </View>
            <View style={{ backgroundColor: "#D8BFD8", paddingTop: 5, marginTop: -1 }}></View>
            <View style={styles.totalSection}>
              <View style={styles.totalRowGross}>
                <Text style={styles.normalText}>TOTAL PAY</Text>
              </View>
              <View style={styles.totalRowGrossUnits}>
                <Text style={styles.normalText}></Text>
              </View>
              <View style={styles.totalRowGrossRate}>
                <Text style={styles.normalText}></Text>
              </View>
              <View style={styles.totalRowGrossAmount}>
                <Text style={styles.normalText}>4075.00</Text>
              </View>
            </View>
          </View>
          <View style={styles.deductionsSection}>
            <View style={{ backgroundColor: "#fff", border: "2px solid #000", alignItems: "flex-start" }}>
              <Text style={styles.deductionsHeader}>DEDUCTIONS/ADJUSTMENTS</Text>
            </View>
            <View style={styles.payTable}>
              <View style={styles.deductionColumn1}>
                <View style={styles.columnHeader}>
                  <Text style={styles.columnHeaderText}>Description</Text>
                </View>
                <View style={styles.columnContent}>
                  <Text style={styles.normalText}>PAYE</Text>
                  <Text style={styles.normalText}>National Insurance</Text>
                </View>
              </View>
              <View style={styles.deductionColumn2}>
                <View style={styles.columnHeader}>
                  <Text style={styles.columnHeaderText}>Amount(£)</Text>
                </View>
                <View style={styles.columnContentWhite}>
                  <Text style={styles.normalText}>-186.00</Text>
                  <Text style={styles.normalText}>-242.16</Text>
                </View>
              </View>
              <View style={[styles.deductionColumn3, { borderRight: "2px solid #000" }]}>
                <View style={styles.columnHeader}>
                  <Text style={styles.columnHeaderText}>Year to Date</Text>
                </View>
                <View style={styles.columnContent}>
                  <Text style={styles.normalText}>186.00</Text>
                  <Text style={styles.normalText}>242.16</Text>
                </View>
              </View>
            </View>
            <View style={{ backgroundColor: "#D8BFD8", paddingTop: 5, marginTop: -1 }}></View>
            <View style={[styles.totalSection, { borderRight: "none" }]}>
              <View style={styles.totalRowDeductions}>
                <Text style={styles.normalText}>TOTAL ADJUSTMENTS</Text>
              </View>
              <View style={styles.totalRowDeductionsAmount}>
                <Text style={styles.normalText}>-428.16</Text>
              </View>
              <View style={styles.totalRowDeductionsYTD}>
                <Text style={styles.normalText}></Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", width: "100%", paddingBottom: 5, paddingTop: 85 }}>
          <View style={styles.netPaySection}>
            <View style={{ justifyContent: "center", alignItems: "center", width: "50%" }}>
              <Text style={styles.netPayText}>NET PAY</Text>
            </View>
            <View style={{ backgroundColor: "#fff", width: "50%", paddingVertical: 5, paddingHorizontal: 10 }}>
              <Text style={{ color: "#000" }}>3646.84</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottomRow}>
          <View style={[styles.ytdSection, { borderLeft: "3px solid #000", borderBottom: "3px solid #000" }]}>
            <Text style={styles.ytdHeader}>THIS EMPLOYMENT Y.T.D.</Text>
            <View style={styles.ytdContent}>
              <View style={styles.ytdLabels}>
                <View style={styles.ytdLabelItem}>
                  <Text style={styles.smallText}>NIable Pay</Text>
                </View>
                <View style={styles.ytdLabelItem}>
                  <Text style={styles.smallText}>Pay</Text>
                </View>
                <View style={styles.ytdLabelItemLast}>
                  <Text style={styles.smallText}>Tax deduct.</Text>
                </View>
              </View>
              <View style={styles.ytdValues}>
                <View style={styles.ytdValueItem}>
                  <Text style={styles.smallText}>4075.00</Text>
                </View>
                <View style={styles.ytdValueItem}>
                  <Text style={styles.smallText}>4075.00</Text>
                </View>
                <View style={styles.ytdValueItemLast}>
                  <Text style={styles.smallText}>186.00</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.prevEmploymentSection, { marginRight: 5, borderBottom: "4px solid #000", marginLeft: -1 }]}>
            <Text style={styles.prevEmploymentHeader}>PREVIOUS EMPLOYMENT</Text>
            <View style={styles.prevEmploymentContent}>
              <View style={styles.prevLabels}>
                <View style={styles.prevLabelItem}>
                  <Text style={styles.smallText}>Pay</Text>
                </View>
                <View style={styles.prevLabelItemLast}>
                  <Text style={styles.smallText}>Tax deduct.</Text>
                </View>
              </View>
              <View style={styles.prevValues}>
                <View style={styles.prevValueItem}>
                  <Text style={styles.smallText}>0.00</Text>
                </View>
                <View style={styles.prevValueItemLast}>
                  <Text style={styles.smallText}>0.00</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.employerContribSection, { borderBottom: "4px solid #000", borderLeft: "4px solid #000", borderRight: "4px solid #000" }]}>
            <Text style={styles.employerContribHeader}>EMPLOYER'S CONTRIBUTIONS</Text>
            <View style={styles.contribSubHeader}>
              <View style={styles.contribSubHeaderEmpty}></View>
              <View style={styles.contribSubHeaderThis}>
                <Text style={styles.smallText}>This Run</Text>
              </View>
              <View style={styles.contribSubHeaderYear}>
                <Text style={styles.smallText}>Year to Date</Text>
              </View>
            </View>
            <View style={styles.contribContent}>
              <View style={styles.contribLabels}>
                <View style={styles.contribLabelItem}>
                  <Text style={styles.smallText}>National Insurance</Text>
                </View>
              </View>
              <View style={styles.contribThisRun}>
                <View style={styles.contribThisRunItem}>
                  <Text style={styles.smallText}>548.70</Text>
                </View>
              </View>
              <View style={styles.contribYearToDate}>
                <View style={styles.contribYearItem}>
                  <Text style={styles.smallText}>548.70</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

const PayslipPDFViewer = () => {
  const handleDownloadPDF = async () => {
    const { pdf } = await import("@react-pdf/renderer");
    const blob = await pdf(<PayslipDocument />).toBlob();
    
    saveAs(blob, "PaySlips-Monthly-20250617.pdf");
  };

  return (
    <div style={{ width: "100%", height: "100vh", textAlign: "center" }}>
      <PDFViewer width="100%" height="100%">
        <PayslipDocument />
      </PDFViewer>
      <button
        onClick={handleDownloadPDF}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        Download Payslip PDF
      </button>
    </div>
  );
};

export default PayslipPDFViewer;