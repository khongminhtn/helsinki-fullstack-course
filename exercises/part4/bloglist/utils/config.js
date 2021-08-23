require('dotenv').config()

const PORT = 3000 || process.env.PORT
const MONGO_URL = process.env.NODE_ENV === 'test'
  ? process.env.TESt_MONGO_URL
  : process.env.MONGO_URL

module.exports = { PORT, MONGO_URL }