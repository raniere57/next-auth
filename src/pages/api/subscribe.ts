import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, Db } from 'mongodb'
import url from 'url'

let cachedDb: Db = null

async function connectToDatabase(uri) {

  if (cachedDb) return cachedDb

  const client = await MongoClient.connect(uri)

  const dbName = url.parse(uri).pathname.substring(1)

  const db = client.db(dbName)

  cachedDb = db

  return db
}

export default async (request: NextApiRequest, response: NextApiResponse) => {

  const { email, password } = request.body

  const db = await connectToDatabase(process.env.MONGODB_URI)

  const collection = db.collection('users')

  await collection.insertOne({
    email,
    password,
    registeredAt: new Date()
  })

  return response.status(201).json({ ok: true })
}