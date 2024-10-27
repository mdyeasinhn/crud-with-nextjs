// pages/api/items/index.js
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('mydatabase');

  switch (req.method) {
    case 'GET':
      try {
        const items = await db.collection('items').find({}).toArray();
        res.status(200).json(items);
      } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve items' });
      }
      break;

    case 'POST':
      const { term, interpretation } = req.body;
      try {
        const result = await db.collection('interpretations').insertOne({ term, interpretation });
        res.status(201).json({ success: true, data: result });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to create interpretation' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}



// pages/api/items/[id].js


export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('mydatabase');
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const item = await db.collection('items').findOne({ _id: new ObjectId(id) });
        if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
        res.status(200).json(item);
      } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve item' });
      }
      break;

    case 'PUT':
      const { term, interpretation } = req.body;
      try {
        const result = await db.collection('items').updateOne(
          { _id: new ObjectId(id) },
          { $set: { term, interpretation } }
        );
        res.status(200).json({ success: true, data: result });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to update item' });
      }
      break;

    case 'DELETE':
      try {
        const result = await db.collection('items').deleteOne({ _id: new ObjectId(id) });
        res.status(200).json({ success: true, data: result });
      } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to delete item' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
