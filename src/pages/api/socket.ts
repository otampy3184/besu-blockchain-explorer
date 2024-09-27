// pages/api/socket.ts
import { NextApiRequest } from 'next';
import { Server } from 'socket.io';
import type { Server as HTTPServer } from 'http';
import type { Socket as NetSocket } from 'net';

import provider from '../../utils/provider';

interface SocketServer extends HTTPServer {
  io?: Server;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

export default function handler(req: NextApiRequest, res: any) {
  if (!res.socket.server.io) {
    console.log('Socket.IOサーバーを初期化します');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('クライアントが接続しました');

      provider.on('block', async (blockNumber) => {
        try {
          const block = await provider.getBlock(blockNumber);
          let blockHeader;
          if(block){
            blockHeader = {
                number: block.number,
                hash: block.hash,
                parentHash: block.parentHash,
                miner: block.miner,
                timestamp: block.timestamp,
                transactions: block.transactions.length,
              };
          }
          socket.emit('newBlockHeader', blockHeader);
        } catch (error) {
          console.error('ブロックヘッダーの取得に失敗しました', error);
        }
      });
    });
  } else {
    console.log('既存のSocket.IOサーバーを使用します');
  }
  res.end();
}
