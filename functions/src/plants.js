import { FieldValue } from 'firebase-admin/firestore'
import { db } from './dbConnect.js'

const collection = db.collection("plants")

export async function getPlants(req,res) {
  const plantsCollection = await collection.get()
  const plants = plantsCollection.docs.map(doc => ({...doc.data(), id: doc.id}))
  res.send(plants)
}

export async function addPlant(req,res) {
  const {plantName, waterFrequency, light, humidity} = req.body
  if(!plantName) {
    res.status(400).send({message: "Plant name is required."})
    return
  }
  const newPlant = {
    plantName,
    waterFrequency,
    light,
    humidity,
    createdAt: FieldValue.serverTimestamp(),
  }
  await collection.add(newPlant)
  getPlants(req,res)
}

export async function deletePlant(req,res) {
  const {plantId} = req.params
  await collection.doc(plantId).delete()
  getPlants(req,res)
}