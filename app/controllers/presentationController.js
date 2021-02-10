import PresentationModel from '../models/presentationModel';
// import connection from '../connection';
// import cloudinary from '../cloudinary';

class PresentationController {  
  /**
   * Create A Presentation
   * @param {object} req 
   * @param {object} res
   * @returns {object} Return status code 201 and Presentation object 
   */
  static async addPresentation(req, res) {
    try {
      const presentation = await PresentationModel.findOne({ name: req.body.name }).exec();
      if(presentation) {
          return res.status(409).send(
            { 
              status: 409,
              message: 'Presentation with that Name already exists',
            }
          );
      }
      const data = new PresentationModel(req.body);
      await data.save();
      return res.status(201).send({
        status: 201,
        message: 'Presentation successfully created',
        data
    });
    } catch(error) {
        return res.status(400).send(
          {
            status: 400,
            message: 'Oops failed to add a presentation',
            error
        });
    }
  }

  /**
   * Get All Presentations
   * @param {object} res 
   * @returns {array} Return status code 200 and Category array
   */
  static async getAllPresentations(req, res) {
    try {
        const data = await PresentationModel.find({});
        return res.status(200).send(
          { 
            status: 200,
            message: 'All available Presentations',
            data
          });
      } catch(error) {
        return res.status(400).send(
          { 
            status: 400,
            message: 'Oops failed to fetch presentations',
            error
          });
      }
  }

  /**
   * Get A Single Presentation
   * @param {object} req 
   * @param {object} res
   * @returns {object} Return status code 200 and Presentation object
   */
  static async getOnePresentation(req, res) {
    const presentation = await PresentationModel.findById(req.params.id)
    try {     
      if(presentation == null) {
        return res.status(404).send(
          { 
            status: 404,
            message: 'Presentation with this Name doesn\'t exist',
          }
        );
      }
      return res.status(200).send(
        { 
          status: 200,
          message: 'Presentation Details',
          presentation
        }
);
    } catch(error) {
      return res.status(400).send({ 
          status: 400,
          message: 'Oops failed to fetch all presentations',
          error
    })
    }
  }

  /**
   * Update A Presentation
   * @param {object} req 
   * @param {object} res 
   * @returns {object} Return status code 200 and Presentation object
   */
  static async updatePresentation(req, res) {
    try {
      const data = req.body;
      await PresentationModel.findOneAndUpdate({
          _id: req.params.id
        }, 
        data
      );
      return res.status(200).send({ 
        status: 200,
        message: 'Presentation updated successfully',
        data 
    });
    } catch(error) {
      return res.status(400).send({ 
          status: 400,
          message: 'Oops failed to update the presentation',
          error
        });
    }
  }

  /**
   * Delete A Presentation
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 200 and message 
   */
  static async deletePresentation(req, res) {
    try {      
      const presentation = await PresentationModel.findById(req.params.id)
      if(presentation == null) {
        return res.status(404).send(
          { 
            status: 404,
            message: 'Presentation with this Title doesn\'t exist',
          }
        );
      }
      await PresentationModel.deleteOne(presentation)
      return res.status(200).send({ 
        status: 200,
        message: 'Presentation deleted successfully'
      });
    } catch(error) {
      return res.status(400).send({ 
          status: 400,
          message: 'Oops failed to delete the Presentation',
          error
        });
    }
  }
}

export default PresentationController;