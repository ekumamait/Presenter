import express from 'express';
import AuthController from '../controllers/userController';
import CategoryController from '../controllers/categoryController';
import PresentationController from '../controllers/presentationController';
import { 
    Authenticate, 
    verifyAdmin 
} from '../helpers/middleware';

// defining middleware routes
const router = express.Router();

// Users routes
router.post('/api/auth/signup', AuthController.signup);
router.post('/api/auth/login', AuthController.login);

// Categories routes
router.post('/api/category/', Authenticate, verifyAdmin, CategoryController.addCategory);
router.get('/api/category/', Authenticate, CategoryController.getAllCategories);
router.get('/api/category/:id', Authenticate, CategoryController.getOneCategory); 
router.put('/api/category/:id', Authenticate, CategoryController.updateCategory);
router.delete('/api/category/:id', Authenticate, verifyAdmin, CategoryController.deleteCategory);

// Presentation routes
router.post('/api/presentation/', Authenticate, PresentationController.addPresentation);
router.get('/api/presentation/', Authenticate, PresentationController.getAllPresentations);
router.get('/api/presentation/:id', Authenticate, PresentationController.getOnePresentation); 
router.put('/api/presentation/:id', Authenticate, PresentationController.updatePresentation);
router.delete('/api/presentation/:id', Authenticate, PresentationController.deletePresentation);

export default router;