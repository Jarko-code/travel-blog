import fs from 'fs'
import path from 'path'
import { faker } from '@faker-js/faker'
import Gallery from '../../models/galleryModel.js'

const __dirname = path.resolve()

async function galleriesFactory() {
  try {
    const exists = await Gallery.exists({})
    if (exists) {
      console.log('Galleries already exist. Skipping seeding.')
      return
    }

    const sourceImagesFolder = path.join(__dirname, 'src', 'assets', 'images', 'mock')
    const availableImages = fs
      .readdirSync(sourceImagesFolder)
      .filter((f) => f.endsWith('.jpg') || f.endsWith('.png'))

    if (availableImages.length === 0) {
      console.warn('No images found in sample-images folder!')
      return
    }

    const galleryPromises = []

    for (let i = 0; i < 5; i++) {
      const title = faker.lorem.words(3)
      const slug = title.toLowerCase().replace(/\s+/g, '_')
      const galleryFolder = path.join(__dirname, 'uploads', slug)

      fs.mkdirSync(galleryFolder, { recursive: true })

      const imagesCount = faker.number.int({ min: 2, max: 5 })
      const images = []

      for (let j = 0; j < imagesCount; j++) {
        const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)]
        const newFileName = `image_${Date.now()}_${faker.number.int({ min: 1000, max: 9999 })}${path.extname(randomImage)}`
        const destPath = path.join(galleryFolder, newFileName)
        const relativePath = `/uploads/${slug}/${newFileName}`

        // ✅ Skopíruj obrázok z assets do galérie
        fs.copyFileSync(path.join(sourceImagesFolder, randomImage), destPath)

        images.push(relativePath)
      }

      const newGallery = new Gallery({
        title,
        description: faker.lorem.paragraph(),
        location: `${faker.location.city()}, ${faker.location.country()}`,
        images,
      })

      galleryPromises.push(newGallery.save())
    }

    await Promise.all(galleryPromises)
    console.log('Seeded galleries successfully with real images.')
  } catch (err) {
    console.error('Error seeding galleries:', err)
  }
}

export default galleriesFactory
