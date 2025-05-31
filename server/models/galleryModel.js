import mongoose from 'mongoose'
import sequence from 'mongoose-sequence'

const AutoIncrement = sequence(mongoose)

const GallerySchema = new mongoose.Schema(
  {
    _id: Number,
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true, _id: false },
)

GallerySchema.plugin(AutoIncrement, {
  inc_field: '_id',
  id: 'gallery',
})

const Gallery = mongoose.model('Gallery', GallerySchema)
export default Gallery
