import { NextApiRequest, NextApiResponse } from 'next';
import provider from '@/utils/provider';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { address } = req.query;
    try {
        const balance = await provider.getBalance(address as string);

        res.status(200).json({ balance: balance.toString() });
    } catch (error) {
        res.status(500).json({ error: `cannot find address: ${error}` });
    }
};