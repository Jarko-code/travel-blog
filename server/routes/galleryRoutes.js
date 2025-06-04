import express from 'express'
import {
  getAllGalleries,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} from '../controllers/galleryController.js'
import gallery from '../middleware/galleryUpload.js'

const router = express.Router()

router.post('/gallery', gallery.array('images', 50), createGallery)

router.get('/gallery', getAllGalleries)
router.get('/gallery/:id', getGalleryById)
router.post('/gallery', createGallery)
router.put('/gallery/:id', updateGallery)
router.delete('/gallery/:id', deleteGallery)

export default router
