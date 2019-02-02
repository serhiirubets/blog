const mongoose = require('mongoose')

mongoose
  .connect(
    process.env.MONGOOSE_LOCAL || process.env.DB_URL,
    { useNewUrlParser: true }
  )
  .then(() => console.log('DB connected'))
  .catch(error => console.error(error))
