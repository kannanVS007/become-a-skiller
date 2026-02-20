import PDFDocument from 'pdfkit';
import Course from '../models/Course.js';
import { Enrollment } from '../models/Transaction.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';

// @desc    Get course certificate
// @route   GET /api/v1/courses/:id/certificate
// @access  Private
export const getCertificate = asyncHandler(async (req, res, next) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        return next(new ErrorResponse('Course not found', 404));
    }

    const enrollment = await Enrollment.findOne({
        user: req.user.id,
        course: req.params.id,
        status: 'completed'
    });

    if (!enrollment) {
        return next(new ErrorResponse('Certificate not available. Please complete the course first.', 403));
    }

    const doc = new PDFDocument({
        layout: 'landscape',
        size: 'A4',
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=certificate-${course.title.replace(/\s+/g, '-')}.pdf`);

    doc.pipe(res);

    // Design the certificate
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fff');

    // Border
    doc.lineWidth(20);
    doc.strokeColor('#D4AF37'); // Gold
    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke();

    // Content
    doc.font('Helvetica-Bold').fontSize(40).fillColor('#000').text('CERTIFICATE OF COMPLETION', 0, 100, { align: 'center' });

    doc.moveDown();
    doc.font('Helvetica').fontSize(20).text('This is to certify that', { align: 'center' });

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(30).fillColor('#333').text(req.user.name, { align: 'center', underline: true });

    doc.moveDown();
    doc.font('Helvetica').fontSize(20).fillColor('#000').text('has successfully completed the course', { align: 'center' });

    doc.moveDown();
    doc.font('Helvetica-Bold').fontSize(25).fillColor('#D4AF37').text(course.title, { align: 'center' });

    doc.moveDown(2);
    doc.font('Helvetica').fontSize(15).fillColor('#555').text(`Date: ${new Date(enrollment.updatedAt).toLocaleDateString()}`, { align: 'center' });
    doc.text(`Certificate ID: ${enrollment.certificationId}`, { align: 'center' });

    doc.end();
});
