import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateInvoice = async (payment, user, courseOrPlan) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const filename = `invoice_${payment.razorpayOrderId}.pdf`;
        const filePath = path.join(process.cwd(), 'temp', filename);

        // Ensure temp directory exists
        if (!fs.existsSync(path.join(process.cwd(), 'temp'))) {
            fs.mkdirSync(path.join(process.cwd(), 'temp'));
        }

        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // Header
        doc.fontSize(20).text('INVOICE', { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(`Company: Become Skiller`, { align: 'right' });
        doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: 'right' });
        doc.text(`Invoice #: ${payment.razorpayOrderId}`, { align: 'right' });

        doc.moveDown();
        doc.text(`Bill To:`, { underline: true });
        doc.text(`Name: ${user.name}`);
        doc.text(`Email: ${user.email}`);

        doc.moveDown();
        doc.fontSize(14).text('Description', 50, 250);
        doc.text('Amount', 400, 250);

        doc.lineCap('butt').moveTo(50, 270).lineTo(550, 270).stroke();

        doc.fontSize(12).text(courseOrPlan, 50, 280);
        doc.text(`INR ${payment.amount}`, 400, 280);

        doc.moveDown(5);
        doc.text(`Transaction ID: ${payment.razorpayPaymentId || 'N/A'}`);
        doc.text(`Status: ${payment.status.toUpperCase()}`);

        doc.moveDown(2);
        doc.fontSize(10).text('Thank you for your purchase!', { align: 'center', italic: true });

        doc.end();

        stream.on('finish', () => {
            resolve({ filePath, filename });
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
};
