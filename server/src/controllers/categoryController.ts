import { Request, Response } from 'express';
import Category, { ICategory } from '../models/Category';
import ResponseModel from '../models/Response';
import mongoose from 'mongoose';

/**
 * Get all categories
 * @route GET /api/categories
 * @access Public
 */
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find()
      .sort({ name: 1 }) // Sort alphabetically
      .select('name description slug');
    
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving categories'
    });
  }
};

/**
 * Get a category by ID
 * @route GET /api/categories/:id
 * @access Public
 */
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Get category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving category'
    });
  }
};

/**
 * Create a new category
 * @route POST /api/categories
 * @access Private (admin/editor)
 */
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, slug, parentCategory } = req.body;
    
    // Validate required fields
    if (!name || !description || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, description, and slug'
      });
    }
    
    // Check if category with same name or slug already exists
    const existingCategory = await Category.findOne({ 
      $or: [{ name }, { slug }] 
    });
    
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category with this name or slug already exists'
      });
    }
    
    // Create new category
    const category = await Category.create({
      name,
      description,
      slug,
      parentCategory: parentCategory || null
    });
    
    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating category'
    });
  }
};

/**
 * Update a category
 * @route PUT /api/categories/:id
 * @access Private (admin/editor)
 */
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, slug, parentCategory } = req.body;
    
    // Find the category to update
    let category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    // Check for duplicate slug if changed
    if (slug && slug !== category.slug) {
      const existingCategory = await Category.findOne({ slug });
      
      if (existingCategory && !existingCategory._id.equals(category._id)) {
        return res.status(400).json({
          success: false,
          message: 'Category with this slug already exists'
        });
      }
    }
    
    // Check for duplicate name if changed
    if (name && name !== category.name) {
      const existingCategory = await Category.findOne({ name });
      
      if (existingCategory && !existingCategory._id.equals(category._id)) {
        return res.status(400).json({
          success: false,
          message: 'Category with this name already exists'
        });
      }
    }
    
    // Update the category
    category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: name || category.name,
        description: description || category.description,
        slug: slug || category.slug,
        parentCategory: parentCategory || category.parentCategory
      },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating category'
    });
  }
};

/**
 * Delete a category
 * @route DELETE /api/categories/:id
 * @access Private (admin only)
 */
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    
    // Start a session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();
    
    try {
      // Check if category is used in responses
      const responsesCount = await ResponseModel.countDocuments({ 
        categories: categoryId 
      });
      
      if (responsesCount > 0) {
        return res.status(400).json({
          success: false,
          message: `Cannot delete category that is used in ${responsesCount} responses`
        });
      }
      
      // Check if category is a parent for other categories
      const childrenCount = await Category.countDocuments({ 
        parentCategory: categoryId 
      });
      
      if (childrenCount > 0) {
        return res.status(400).json({
          success: false,
          message: `Cannot delete category that is a parent for ${childrenCount} other categories`
        });
      }
      
      // Delete the category
      const category = await Category.findByIdAndDelete(categoryId).session(session);
      
      if (!category) {
        await session.abortTransaction();
        return res.status(404).json({
          success: false,
          message: 'Category not found'
        });
      }
      
      await session.commitTransaction();
      
      res.status(200).json({
        success: true,
        message: 'Category deleted successfully'
      });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting category'
    });
  }
};

/**
 * Get responses for a specific category
 * @route GET /api/categories/:id/responses
 * @access Public
 */
export const getCategoryResponses = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;
    
    // Check if category exists
    const category = await Category.findById(categoryId);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    // Pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const sort = req.query.sort as string || '-createdAt'; // Default: newest first
    
    // Find responses in this category
    const responses = await ResponseModel.find({ categories: categoryId })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('title question excerpt tags createdAt');
    
    // Get total count for pagination
    const total = await ResponseModel.countDocuments({ categories: categoryId });
    
    // Calculate pagination values
    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;
    
    res.status(200).json({
      success: true,
      category: {
        _id: category._id,
        name: category.name,
        description: category.description,
        slug: category.slug
      },
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
    console.error('Get category responses error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving category responses'
    });
  }
};
