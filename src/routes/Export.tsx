import { PDFDocument, StandardFonts } from 'pdf-lib';
import { useStore } from '../store';

async function fillSS4(answers: ReturnType<typeof useStore.getState>['answers']) {
  const existingPdfBytes = await fetch('/ss4.pdf').then(r => r.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // Use a single PDFPage (drawText is on PDFPage, not PDFPage[])
  const page = pdfDoc.getPages();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const draw = (text: string, x: number, y: number) => {
    page.drawText(text || '', { x, y, size: 10, font });
  };

  // ... your field mappings
  draw(answers.legalName, 80, 695);
  // etc.

  const bytes = await pdfDoc.save(); // Uint8Array
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  return new Blob([buffer], { type: 'application/pdf' });
}
