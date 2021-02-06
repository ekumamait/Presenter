import SlideModel from '../models/slideModel';
// import connection from '../connection';
// import cloudinary from '../cloudinary';

class SlideController {  
  /**
   * Create A Slide
   * @param {object} req 
   * @param {object} res
   * @returns {object} Return status code 201 and Slide object 
   */
  static async addSlide(req, res) {
    try {
      const slide = await SlideModel.findOne({ name: req.body.name }).exec();
      if(slide) {
          return res.status(409).send(
            { 
              status: 409,
              message: 'Slide with that Name already exists',
            }
          );
      }
      const data = new SlideModel(req.body);
      await data.save();
      return res.status(201).send({
        status: 201,
        message: 'Slide successfully added',
        data
    });
    } catch(error) {
        return res.status(400).send(
          {
            status: 400,
            message: 'Oops failed to add a slide',
            error
        });
    }
  }

  /**
   * Get All Slides
   * @param {object} res 
   * @returns {array} Return status code 200 and Slide array
   */
  static async getAllSlides(res) {
    try {
      const data = await SlideModel.find({});
      return res.status(200).send(
        { 
          status: 200,
          message: 'All available Slides',
          data
        });
    } catch(error) {
      return res.status(400).send(
        { 
          status: 400,
          message: 'Oops failed to fetch slides',
          error
        });
    }
  }

  /**
   * Get A Single Slide
   * @param {object} req 
   * @param {object} res
   * @returns {object} Return status code 200 and Slide object
   */
  static async getOneSlide(req, res) {
    const slide = await SlideModel.findById(req.params.id)
    try {     
      if(slide == null) {
        return res.status(404).send(
          { 
            status: 404,
            message: 'Slide with this Name doesn\'t exist',
          }
        );
      }
      return res.status(200).send(
        { 
          status: 200,
          message: 'Slide Details',
          slide
        }
      );
    } catch(error) {
      return res.status(400).send({ 
          status: 400,
          message: 'Oops failed to fetch all slides',
          error
    })
    }
  }

  /**
   * Update A Slide
   * @param {object} req 
   * @param {object} res 
   * @returns {object} Return status code 200 and Slide object
   */
  static async updateSlide(req, res) {
    try {
      const data = req.body;
      await SlideModel.findOneAndUpdate({
          _id: req.params.id
        }, 
        data
      );
      return res.status(200).send({ 
        status: 200,
        message: 'Slide updated successfully',
        data 
    });
    } catch(error) {
      return res.status(400).send({ 
          status: 400,
          message: 'Oops failed to update the slide',
          error
        });
    }
  }

  /**
   * Delete A Slide
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 200 and message 
   */
  static async deleteSlide(req, res) {
    try {      
      const slide = await SlideModel.findById(req.params.id)
      if(slide == null) {
        return res.status(404).send(
          { 
            status: 404,
            message: 'Slide with this Title doesn\'t exist',
          }
        );
      }
      await SlideModel.deleteOne(slide)
      return res.status(200).send({ 
        status: 200,
        message: 'Slide deleted successfully'
      });
    } catch(error) {
      return res.status(400).send({ 
          status: 400,
          message: 'Oops failed to delete the Slide',
          error
        });
    }
  }
}

export default SlideController;