import { Request, Response } from 'express';
import ResponseModel, { IResponse } from '../models/Response';
import Category from '../models/Category';
// Import html2pdf for PDF generation (you'd need to install and set up this package)
// import html2pdf from 'html-pdf';

/**
 * Get all responses with pagination and filtering
 * @route GET /api/responses
 * @access Public
 */
export const getResponses = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const sort = req.query.sort as string || '-createdAt'; // Default: newest first
    const category = req.query.category as string;
    const tag = req.query.tag as string;

    // Build query
    let query: any = {};
    
    // Filter by category if provided
    if (category) {
      query.categories = category;
    }
    
    // Filter by tag if provided
    if (tag) {
      query.tags = tag;
    }
    
    // Execute query with pagination
    const responses = await ResponseModel.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .populate('categories', 'name slug')
      .select('title question excerpt categories tags createdAt');
    
    // Get total count for pagination
    const total = await ResponseModel.countDocuments(query);
    
    // Calculate pagination values
    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;
    
    res.status(200).json({
      success: true,
      data: responses,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasMore
      }
    });
  } catch (error) {
    console.error('Get responses error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving responses'
    });
  }
};

/**
 * Get a single response by ID
 * @route GET /api/responses/:id
 * @access Public
 */
export const getResponseById = async (req: Request, res: Response) => {
  try {
    const responseId = req.params.id;
    
    const response = await ResponseModel.findById(responseId)
      .populate('categories', 'name slug');
    
    if (!response) {
      return res.status(404).json({
        success: false,
        message: 'Response not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: response
    });
  } catch (error) {
    console.error('Get response error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving response'
    });
  }
};

/**
 * Create a new response
 * @route POST /api/responses
 * @access Private (admin/editor)
 */
export const createResponse = async (req: Request, res: Response) => {
  try {
    const { 
      title, 
      question, 
      answer, 
      excerpt, 
      references, 
      categories, 
      tags 
    } = req.body;
    
    // Validate required fields
    if (!title || !question || !answer || !excerpt) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title, question, answer, and excerpt'
      });
    }
    
    // Create response
    const response = await ResponseModel.create({
      title,
      question,
      answer,
      excerpt,
      references: references || [],
      categories: categories || [],
      tags: tags || [],
      author: req.user.name // Get author from logged in user
    });
    
    // Return the new response
    res.status(201).json({
      success: true,
      data: response
    });
  } catch (error) {
    console.error('Create response error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating response'
    });
  }
};

/**
 * Update a response
 * @route PUT /api/responses/:id
 * @access Private (admin/editor)
 */
export const updateResponse = async (req: Request, res: Response) => {
  try {
    const responseId = req.params.id;
    const { 
      title, 
      question, 
      answer, 
      excerpt, 
      references, 
      categories, 
      tags 
    } = req.body;
    
    // Find response to update
    let response = await ResponseModel.findById(responseId);
    
    if (!response) {
      return res.status(404).json({
        success: false,
        message: 'Response not found'
      });
    }
    
    // Update fields
    const updatedResponse = await ResponseModel.findByIdAndUpdate(
      responseId,
      {
        title,
        question,
        answer,
        excerpt,
        references,
        categories,
        tags
      },
      { new: true, runValidators: true }
    ).populate('categories', 'name slug');
    
    res.status(200).json({
      success: true,
      data: updatedResponse
    });
  } catch (error) {
    console.error('Update response error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating response'
    });
  }
};

/**
 * Delete a response
 * @route DELETE /api/responses/:id
 * @access Private (admin only)
 */
export const deleteResponse = async (req: Request, res: Response) => {
  try {
    const responseId = req.params.id;
    
    // Find and delete the response
    const response = await ResponseModel.findByIdAndDelete(responseId);
    
    if (!response) {
      return res.status(404).json({
        success: false,
        message: 'Response not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Response deleted successfully'
    });
  } catch (error) {
    console.error('Delete response error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting response'
    });
  }
};

/**
 * Search responses
 * @route GET /api/responses/search
 * @access Public
 */
export const searchResponses = async (req: Request, res: Response) => {
  try {
    const searchTerm = req.query.q as string;
    
    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a search term'
      });
    }
    
    // Perform text search
    const responses = await ResponseModel.find(
      { $text: { $search: searchTerm } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(20)
      .populate('categories', 'name slug')
      .select('title question excerpt categories tags createdAt');
    
    res.status(200).json({
      success: true,
      count: responses.length,
      data: responses
    });
  } catch (error) {
    console.error('Search responses error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching responses'
    });
  }
};

/**
 * Generate a PDF for a response
 * @route GET /api/responses/:id/pdf
 * @access Public
 */
export const generatePdf = async (req: Request, res: Response) => {
  try {
    const responseId = req.params.id;
    
    // Get the response
    const response = await ResponseModel.findById(responseId)
      .populate('categories', 'name slug');
    
    if (!response) {
      return res.status(404).json({
        success: false,
        message: 'Response not found'
      });
    }
    
    // In a real implementation, you would:
    // 1. Generate HTML for the PDF
    // 2. Convert to PDF using html2pdf or similar
    // 3. Either save to storage and update response.pdfUrl
    //    or stream directly to the client
    
    // For now, we'll just return a placeholder response
    res.status(200).json({
      success: true,
      message: 'PDF generation would happen here',
      data: {
        title: response.title,
        // Pretend URL where the PDF would be stored
        pdfUrl: `/pdfs/${responseId}.pdf`
      }
    });
    
    // Example implementation with html2pdf (commented out)
    /*
    const html = `
      <html>
        <head>
          <title>${response.title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #0055a4; }
            .question { font-style: italic; margin-bottom: 20px; }
            .references { margin-top: 20px; border-top: 1px solid #ccc; padding-top: 20px; }
          </style>
        </head>
        <body>
          <h1>${response.title}</h1>
          <div class="question">${response.question}</div>
          <div class="answer">${response.answer}</div>
          <div class="references">
            <h3>References</h3>
            <ul>
              ${response.references.map(ref => `
                <li>Paper ${ref.paper}, Section ${ref.section}, Paragraph ${ref.paragraph}: "${ref.quote}"</li>
              `).join('')}
            </ul>
          </div>
        </body>
      </html>
    `;
    
    const options = { format: 'Letter' };
    
    html2pdf.create(html, options).toStream((err, stream) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error generating PDF'
        });
      }
      
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="response-${responseId}.pdf"`);
      stream.pipe(res);
    });
    */
  } catch (error) {
    console.error('Generate PDF error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating PDF'
    });
  }
};
