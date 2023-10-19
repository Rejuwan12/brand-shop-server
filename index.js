const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());











app.get('/', (req, res) => {
    res.send('Fashion Server Making....')
})

app.listen(port,(req, res) => {
    console.log(`Fashion Server is Running On Port: ${port}`);
} )