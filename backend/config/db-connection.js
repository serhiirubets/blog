const mongoose = require('mongoose')

mongoose
  .connect(
    process.env.MONGOOSE_LOCAL,
    { useNewUrlParser: true }
  )
  .then(() => console.log('DB connected'))
  .catch(error => console.error(error))
