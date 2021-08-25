// =============================
//         DEPENDENCIES
// =============================
const express = require('express')
const app = express()
const port = 3000

// =============================
//         LISTEN ROUTE
// =============================
app.listen(port, ()=>{
  console.log("listening on port", port);
})
