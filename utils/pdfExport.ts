
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const exportElementToPdf = async (
  element: HTMLElement, 
  filename: string, 
  options: { dark?: boolean; title?: string } = {}
) => {
  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: options.dark ? '#0f172a' : '#ffffff',
      logging: false
    });
    
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth() - 40;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    if (options.title) {
      pdf.setFontSize(20);
      pdf.text(options.title, 20, 20);
      pdf.addImage(imgData, 'JPEG', 20, 35, pdfWidth, pdfHeight);
    } else {
      pdf.addImage(imgData, 'JPEG', 20, 20, pdfWidth, pdfHeight);
    }
    
    pdf.setFontSize(8);
    pdf.setTextColor(150);
    pdf.text(`Document généré par Younited AI Digital - ${new Date().toLocaleString()}`, 20, pdf.internal.pageSize.getHeight() - 10);
    
    pdf.save(filename);
    return true;
  } catch (err) {
    console.error('PDF Export failed:', err);
    throw err;
  }
};
