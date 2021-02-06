import CategoryModel from '../models/categoryModel';
// import connection from '../connection';
// import cloudinary from '../cloudinary';

class CategoryController {  
  /**
   * Create A Category
   * @param {object} req 
   * @param {object} res
   * @returns {object} Return status code 201 and Category object 
   */
  static async addCategory(req, res) {
    try {
      const category = await CategoryModel.findOne({ name: req.body.name }).exec();
      if(category) {
          return res.status(409).send(
            { 
              status: 409,
              message: 'Category with that Name already exists',
            }
          );
      }
      const data = new CategoryModel(req.body);
      await data.save();
      return res.status(201).send({
        status: 201,
        message: 'Category successfully created',
        data
    });
    } catch(error) {
        return res.status(400).send(
          {
            status: 400,
            message: 'Oops failed to add a categories',
            error
        });
    }
  }

  /**
   * Get All Categories
   * @param {object} req 
   * @param {object} res 
   * @returns {array} Return status code 200 and Category array
   */
  static async getAllCategories(req, res) {
    try {
      const data = await CategoryModel.find({});
      return res.status(200).send(
        { 
          status: 200,
          message: 'All available Categories',
          data
        });
    } catch(error) {
      return res.status(400).send(
        { 
          status: 400,
          message: 'Oops failed to fetch categories',
          error
        });
    }
  }

  /**
   * Get A Single Category
   * @param {object} req 
   * @param {object} res
   * @returns {object} Return status code 200 and Category object
   */
  static async getOneCategory(req, res) {
    const data = await CategoryModel.findById(req.params.id)
    try {     
      if(data == null) {
        return res.status(404).send(
          { 
            status: 404,
            message: 'Category with this Name doesn\'t exist',
          }
        );
    }
      return res.status(200).send(
        { 
          status: 200,
          message: 'Category Details',
          data
        }
);
    } catch(error) {
      return res.status(400).send({ 
          status: 400,
          message: 'Oops failed to fetch all categories',
          error
    })
    }
  }

  /**
   * Update A Category
   * @param {object} req 
   * @param {object} res 
   * @returns {object} Return status code 200 and Category object
   */
  static async updateCategory(req, res) {
    try {
      const data = req.body;
      await CategoryModel.findOneAndUpdate({
          _id: req.params.id
        }, 
        data
      );
      return res.status(200).send({ 
        status: 200,
        message: 'Category updated successfully',
        data 
    });
    } catch(error) {
      return res.status(400).send({ 
          status: 400,
          message: 'Oops failed to update the book',
          error
        });
    }
  }

  /**
   * Delete A Category
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 200 and message 
   */
  static async deleteCategory(req, res) {
    try {      
      const category = await CategoryModel.findById(req.params.id)
      if(category == null) {
        return res.status(404).send(
          { 
            status: 404,
            message: 'Category with this Title doesn\'t exist',
          }
        );
      }
      await CategoryModel.deleteOne(category)
      return res.status(200).send({ 
        status: 200,
        message: 'Category deleted successfully'
      });
    } catch(error) {
      return res.status(400).send({ 
          status: 400,
          message: 'Oops failed to delete the Category',
          error
        });
    }
  }
}

export default CategoryController;