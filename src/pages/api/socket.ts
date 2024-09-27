// src/pages/api/socket.ts
import { Server } from 'socket.io';
import provider from '@/utils/provider';

export default function SocketHandler(req: any, res: any) {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on('connection', (socket) => {
            console.log('クライアントが接続しました');

            // 新しいブロックが追加されたときのイベント
            provider.on('block', async (blockNumber) => {
                // ブロックヘッダーを取得
                const block = await provider.getBlock(blockNumber);
                let blockHeader;
                if (block) {
                    blockHeader = {
                        number: block.number,
                        hash: block.hash,
                        parentHash: block.parentHash,
                        miner: block.miner,
                        timestamp: block.timestamp,
                        transactions: block.transactions.length,
                    };
                }

                // クライアントにブロックヘッダーを送信
                socket.emit('newBlockHeader', blockHeader);
            });
        });
    }
    res.end();
}
