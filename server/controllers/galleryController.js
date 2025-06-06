import Gallery from '../models/galleryModel.js'
import slugify from 'slugify'
import fs from 'fs'
import path from 'path'

// Helper na vytvorenie absolútnych URL obrázkov
const getAbsoluteImageUrls = (req, relativePaths) => {
  const host = `${req.protocol}://${req.get('host')}`
  return relativePaths.map((path) => `${host}${path}`)
}

export const createGallery = async (req, res) => {
  try {
    const { title, description, location } = req.body

    if (!title || !req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Title and at least one image are required.' })
    }

    const slug = slugify(title, { lower: true, strict: true })
    const relativeImagePaths = req.files.map((file) => `/uploads/${slug}/${file.filename}`)

    const newGallery = new Gallery({
      title,
      description,
      location,
      images: relativeImagePaths,
    })

    await newGallery.save()

    res.status(201).json({
      _id: newGallery._id,
      title: newGallery.title,
      description: newGallery.description,
      location: newGallery.location,
      images: {
        relative: relativeImagePaths,
        absolute: getAbsoluteImageUrls(req, relativeImagePaths),
      },
      createdAt: newGallery.createdAt,
    })
  } catch (error) {
    console.error('Error creating gallery:', error)
    res.status(500).json({ message: 'Server error while creating gallery.' })
  }
}

export const getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 })

    const result = galleries.map((gallery) => ({
      _id: gallery._id,
      title: gallery.title,
      description: gallery.description,
      location: gallery.location,
      images: {
        relative: gallery.images,
        absolute: getAbsoluteImageUrls(req, gallery.images),
      },
      createdAt: gallery.createdAt,
    }))

    res.json(result)
  } catch (error) {
    console.error('Error fetching galleries:', error)
    res.status(500).json({ message: 'Server error while fetching galleries.' })
  }
}

export const getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id)

    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' })
    }

    res.json({
      _id: gallery._id,
      title: gallery.title,
      description: gallery.description,
      location: gallery.location,
      images: {
        relative: gallery.images,
        absolute: getAbsoluteImageUrls(req, gallery.images),
      },
      createdAt: gallery.createdAt,
    })
  } catch (error) {
    console.error('Error fetching gallery by ID:', error)
    res.status(500).json({ message: 'Server error while fetching gallery.' })
  }
}

export const updateGallery = async (req, res) => {
  try {
    const { title, description, location } = req.body

    const gallery = await Gallery.findById(req.params.id)
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' })
    }

    if (title) gallery.title = title
    if (description) gallery.description = description
    if (location) gallery.location = location

    await gallery.save()

    res.json({
      _id: gallery._id,
      title: gallery.title,
      description: gallery.description,
      location: gallery.location,
      images: {
        relative: gallery.images,
        absolute: getAbsoluteImageUrls(req, gallery.images),
      },
      createdAt: gallery.createdAt,
    })
  } catch (error) {
    console.error('Error updating gallery:', error)
    res.status(500).json({ message: 'Server error while updating gallery.' })
  }
}

export const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id)

    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' })
    }

    res.json({ message: 'Gallery deleted successfully.' })
  } catch (error) {
    console.error('Error deleting gallery:', error)
    res.status(500).json({ message: 'Server error while deleting gallery.' })
  }
}

export const deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params
    const filePath = req.query.file

    if (!filePath) {
      return res.status(400).json({ message: 'No file path provided.' })
    }

    const gallery = await Gallery.findById(id)
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found.' })
    }

    // Odstráň cestu z pola v DB
    gallery.images = gallery.images.filter((img) => !img.includes(path.basename(filePath)))
    await gallery.save()

    // Odstráň fyzicky súbor
    const fullPath = path.join(process.cwd(), filePath)
    fs.unlink(fullPath, (err) => {
      if (err) {
        console.error('Error deleting image file:', err)
      }
    })

    res.json({ message: 'Image deleted successfully.' })
  } catch (error) {
    console.error('Error deleting gallery image:', error)
    res.status(500).json({ message: 'Server error while deleting image.' })
  }
}
