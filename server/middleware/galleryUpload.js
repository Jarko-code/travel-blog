import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Nastavenie ukladania na disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const galleryTitle = req.body.title?.replace(/\s+/g, '_').toLowerCase() || 'misc'
    const dir = `uploads/${galleryTitle}`

    // Ak priečinok neexistuje, vytvor ho
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    cb(null, dir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + '-' + uniqueSuffix + ext)
  },
})

// Filter na obrázky (jpg, png, gif)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/
  const ext = path.extname(file.originalname).toLowerCase()
  const mimetype = allowedTypes.test(file.mimetype)

  if (mimetype && allowedTypes.test(ext)) {
    cb(null, true)
  } else {
    cb(new Error('Povolené sú len obrázky (jpeg, jpg, png, gif)'))
  }
}

const gallery = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
})

export default gallery
