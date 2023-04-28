import functions from 'firebase-functions'
import express from 'express'
import cors from 'cors'
import { addPlant, deletePlant, getPlants } from './src/plants.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get("/plants", getPlants)
app.post("/plants", addPlant)
app.delete("/plants/:plantId", deletePlant)

app.listen(3000, () => console.log('Listening on http://localhost:3000...'))


export const api = functions.https.onRequest(app)