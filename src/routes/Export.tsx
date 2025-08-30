import { PDFDocument, StandardFonts } from 'pdf-lib';
import { useStore } from '../store';

async function fillSS4(answers: ReturnType<typeof useStore.getState>['answers']) {
  const url = '/ss4.pdf';
  const existingPdfBytes = await fetch(url).then(r => r.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const page = pdfDoc.getPages();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const draw = (text:string, x:number, y:number) => {
    page.drawText(text || '', { x, y, size: 10, font });
  };

  // Minimal mapping for common fields; coordinates are approximate and may need adjustment
  draw(answers.legalName, 80, 695);          // Line 1
  draw(answers.dbaName, 80, 677);            // Line 2
  draw(answers.address, 80, 661);            // Line 4a
  draw(`${answers.city}, ${answers.state} ${answers.zip}`, 80, 645); // Line 4b
  draw(answers.responsibleName, 340, 610);   // Line 7a
  draw(answers.responsibleSSN_ITIN, 470, 610); // 7b
  draw(answers.reason.replaceAll('_',' '), 120, 515); // Line 10
  draw(answers.startDate, 470, 495);         // Line 11
  draw(answers.industry, 120, 420);          // Line 16
  draw(answers.phone, 470, 565);             // Contact phone

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export default function Export() {
  const { answers } = useStore();

  const handleDownload = async () => {
    const blob = await fillSS4(answers);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'SS-4_prefilled.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <h2>Export SS‑4 PDF</h2>
      <div className="card">
        <p>This generates a prefilled SS‑4 for fax/mail if the online flow errors. Verify all fields before sending.</p>
        <button className="btn" onClick={handleDownload}>Download PDF</button>
      </div>
      <a className="btn secondary" href="/review">Back</a>
    </div>
  );
}
