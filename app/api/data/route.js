import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URI
const client = new MongoClient(uri)

export async function GET() {
  try {
    await client.connect()
    const database = client.db(process.env.DATABASE_NAME) // Use environment variable
    const collection = database.collection('festivals') // Update to actual collection
    
    const data = await collection.find({}).limit(10).toArray()
    
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error(error) // Optional: log error for debugging
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  } finally {
    await client.close()
  }
}
