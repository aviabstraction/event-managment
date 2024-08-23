
import { signUp,login,getAllOrganizer} from '../controllers/authController.js';
import express from 'express';
import { verifyToken } from '../utils/generateToken.js';

const router = express.Router();

// Define routes
router.get('/allusers', verifyToken, getAllOrganizer );
router.post('/signup', signUp);
router.post('/login', login);

// Export the router as the default export
export default router;
