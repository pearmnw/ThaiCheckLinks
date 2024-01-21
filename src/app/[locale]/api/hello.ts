import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        // Process a POST request
        console.log('Hello');
    } else {
        // Handle any other HTTP method
    }
}