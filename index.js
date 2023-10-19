const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

// middleware



app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.anrbjpf.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const productCollection = client.db('productsDB').collection('products')
    const cartCollection = client.db('productsDB').collection('carts') 

   app.post('/products', async(req, res) => {
       const newProduct = req.body;
       console.log(newProduct);
       const result = await productCollection.insertOne(newProduct);
       res.send(result);
   })

   app.get("/products", async (req, res) => {
    const cursor = productCollection.find()
    const result = await cursor.toArray()
    res.send(result)
  })

  app.get("/products/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await productCollection.findOne(query)
    res.send(result)
  })

//   cart related apis

app.post("/cart", async (req, res) => {
    const cart = req.body;
    const result = await cartCollection.insertOne(cart);
    res.send(result)
  })
  app.get("/cart", async (req, res) => {
    const cursor = cartCollection.find()
    const result = await cursor.toArray()
    res.send(result)
  })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);










app.get('/', (req, res) => {
    res.send('Fashion Server Making....')
})

app.listen(port,(req, res) => {
    console.log(`Fashion Server is Running On Port: ${port}`);
} )