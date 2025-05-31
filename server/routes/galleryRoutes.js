import express from 'express'
import {
  getAllGalleries,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} from '../controllers/galleryController.js'

const router = express.Router()

router.get('/gallery', getAllGalleries)
router.get('/gallery/:id', getGalleryById)
router.post('/gallery', createGallery)
router.put('/gallery/:id', updateGallery)
router.delete('/gallery/:id', deleteGallery)

export default router
