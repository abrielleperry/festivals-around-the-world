import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URI // Ensure this matches your `.env` variable
const client = new MongoClient(uri)

export async function POST(request) {
  try {
    const body = await request.json()
    await client.connect()
    const database = client.db(process.env.DATABASE_NAME) // Use environment variable
    const collection = database.collection('festivals')
    
    const result = await collection.insertOne(body)
    
    return new Response(JSON.stringify({ success: true, id: result.insertedId }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error(error) // Optional: log error for debugging
    return new Response(JSON.stringify({ error: 'Failed to submit data' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  } finally {
    await client.close()
  }
}
