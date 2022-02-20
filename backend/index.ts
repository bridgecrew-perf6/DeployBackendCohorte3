import { baseDeDatos} from "./database"
import { json } from "body-parser"

const cors = require('cors')
const express = require('express')
const app = express()

app.use(json())
app.use(cors())

const port = 3000
const usersCollection = baseDeDatos.collection("users")
const productCollection = baseDeDatos.collection("producto")

/* rutas con GET */
app.get('/users', (req, res) => {
    /* Devuelve todos los usuarios  Limite:20 */
    usersCollection.limit(20).get().then(snap=>{
      const docs = snap.docs
      const resp = []
      for (const doc of docs) {
        resp.push(doc.data())
      }
      res.json(resp)
      })
    })
app.get('/users/:userid', (req, res) => {
  /* Devuelve un usuario en particular */
    const userid = req.params.userid
    usersCollection.doc(userid).get().then((snap)=>{
      if(snap.exists){
        res.send(snap.data())
      }else{
        res.send("User Not Found")
      }
    })
  })

app.get('/product', (req, res) => {
    /* Devuelve todos los productos   Limite:20 */
    productCollection.limit(20).get().then(snap=>{
      const docs = snap.docs
      const resp = []
      for (const doc of docs) {
        resp.push(doc.data())
      }
      res.json(resp)
      })
    })
app.get('/product/:productid', (req, res) => {
  /* Devuelve un producto en particular */
    const productid = req.params.productid
    productCollection.doc(productid).get().then((snap)=>{
      if(snap.exists){
        res.send(snap.data())
      }else{
        res.send("User Not Found")
      }
    })
  })
app.get('/product/:filter/:marca', (req, res) => {
    /* Filtro pormarca */
    const marca = req.params.marca
    const filter = req.params.filter
    productCollection.where( filter, "==" , marca).limit(20).get().then((snap)=>{
      if(snap.empty){
        res.send("No hay marcas con ese nombre")
      } else{
        const docs = snap.docs
        const resp = []
        for (const doc of docs) {
        resp.push(doc.data())
        }
        res.json(resp)
      }
    })
  })
app.get('/product/:filter/:operacion/:precio', (req, res) => {
    /* Filtro por precio */  
    /* Todos los params que llegan de la URL */
    const precio = req.params.precio
    const stringToNumber =  Number(precio)
    const filter = req.params.filter
    let operacion = req.params.operacion

    /* Convierto la operacion en el signo que necesito */
    if (operacion == "mayor") {
      operacion = ">"
    }else if(operacion == "igual"){
      operacion = "=="
    }else if (operacion == "menor"){
      operacion = "<"
    }
    /* Devuelvo el filtro */
    productCollection.where(filter, operacion , stringToNumber).limit(20).get().then((snap)=>{
      if(snap.empty){
        res.send("No hay productos con ese precio")
      } else{
        const docs = snap.docs
        const resp = []
        for (const doc of docs) {
        resp.push(doc.data())
        }
        res.json(resp)
      }
    })
  })
/* rutas con POST */

app.post('/users', function (req, res) {
  /* Crea un usuario */
    const newUserDoc = usersCollection.doc()
    newUserDoc.create(req.body).then(()=>{
      res.send(newUserDoc.id)
        })
    });
app.post('/product', function (req, res) {
  /* Crea un Producto */
    const newProductDoc = productCollection.doc()
    newProductDoc.create(req.body).then(()=>{
        res.send(newProductDoc.id)
      })
    });    

    app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})