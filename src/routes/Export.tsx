import { PDFDocument, PDFPage, StandardFonts } from 'pdf-lib'; // note: import PDFPage for typing
import { useStore } from '../store';

async function fillSS4(answers: ReturnType<typeof useStore.getState>['answers']) {
  const existingPdfBytes = await fetch('/ss4.pdf').then(r => r.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Force correct typing: single PDFPage, not PDFPage[]
  const pages = pdfDoc.getPages();           // PDFPage[]
  const page: PDFPage = pages;            // PDFPage

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const draw = (text: string, x: number, y: number) => {
    page.drawText(text || '', { x, y, size: 10, font });
  };

  // Field mapping (same as before)
  draw(answers.legalName, 80, 695);
  draw(answers.dbaName, 80, 677);
  draw(answers.address, 80, 661);
  draw(`${answers.city}, ${answers.state} ${answers.zip}`, 80, 645);
  draw(answers.responsibleName, 340, 610);
  draw(answers.responsibleSSN_ITIN, 470, 610);
  draw(answers.reason.replaceAll('_', ' '), 120, 515);
  draw(answers.startDate, 470, 495);
  draw(answers.industry, 120, 420);
  draw(answers.phone, 470, 565);

  // Save to bytes and produce a Blob in a TS-safe way:
  const bytes = await pdfDoc.save();               // Uint8Array

  // Option A: wrap Uint8Array directly (works when DOM types are present)
  // return new Blob([bytes], { type: 'application/pdf' });

  // Option B (most compatible): use Response to normalize BlobPart
  const blob = await new Response(bytes).blob();   // Blob from Uint8Array
  return blob;
}
