import { NextApiRequest, NextApiResponse } from "next";
import provider from "@/utils/provider";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { hash } = req.query;
    try {
        const transaction = await provider.getTransaction(hash as string);
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({error: "cannot find transaction"});
    }
};