import express from 'express'
import {
  getAllGalleries,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
  deleteGalleryImage,
} from '../controllers/galleryController.js'
import gallery from '../middleware/galleryUpload.js'

const router = express.Router()

router.post('/gallery', gallery.array('images', 50), createGallery)
router.get('/gallery', getAllGalleries)
router.get('/gallery/:id', getGalleryById)
router.put('/gallery/:id', gallery.array('images', 50), updateGallery)
router.delete('/gallery/:id', deleteGallery)
router.delete('/gallery/:id/image', deleteGalleryImage)

export default router
