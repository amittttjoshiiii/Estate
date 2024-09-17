import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createlisting, deleteListing, getListing, getListings, updateListing } from '../Controller/listing.controller.js';

const router = express.Router();

router.post('/create' , verifyToken , createlisting);
router.delete('/delete/:id' , verifyToken , deleteListing)
router.post('/update/:id'  ,verifyToken , updateListing)
router.get("/get/:id", getListing);
router.get("/get", getListings);


export default router;