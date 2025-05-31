import Gallery from '../models/galleryModel.js'

export const getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find()
    res.json(galleries)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching galleries', error })
  }
}

export const getGalleryById = async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id)
    if (!gallery) {
      return res.status(404).json({ message: 'Gallery not found' })
    }
    res.json(gallery)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching gallery', error })
  }
}

export const createGallery = async (req, res) => {
  try {
    const { title, description, location, images } = req.body

    if (!title || !images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ message: 'Title and minumum one picture is required' })
    }

    const newGallery = new Gallery({
      title,
      description,
      location,
      images,
    })

    const savedGallery = await newGallery.save()
    res.status(201).json(savedGallery)
  } catch (error) {
    res.status(500).json({ message: 'Error creating gallery', error })
  }
}

export const updateGallery = async (req, res) => {
  try {
    const { title, description, location, images } = req.body

    const updatedData = {
      ...(title && { title }),
      ...(description !== undefined && { description }),
      ...(location !== undefined && { location }),
      ...(images && Array.isArray(images) && { images }),
    }

    const updatedGallery = await Gallery.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true,
    })

    if (!updatedGallery) {
      return res.status(404).json({ message: 'Gallery not found' })
    }

    res.json(updatedGallery)
  } catch (error) {
    res.status(500).json({ message: 'Error updating gallery', error })
  }
}

export const deleteGallery = async (req, res) => {
  try {
    const deletedGallery = await Gallery.findByIdAndDelete(req.params.id)
    if (!deletedGallery) {
      return res.status(404).json({ message: 'Gallery not found' })
    }
    res.json({ message: 'Gallery has been removed' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting gallery', error })
  }
}
