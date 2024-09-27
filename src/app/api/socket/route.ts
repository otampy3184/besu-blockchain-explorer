// app/api/socket/route.ts
import { NextRequest } from 'next/server';
import { Server } from 'socket.io';
import { NextResponse } from 'next/server';
import provider from '../../../utils/provider';

export async function GET(request: NextRequest) {
  if (!(global as any).io) {
    console.log('Socket.IOサーバーを初期化します');
    const io = new Server();
    (global as any).io = io;

    io.on('connection', (socket) => {
      console.log('クライアントが接続しました');

      provider.on('block', async (blockNumber) => {
        try {
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
          socket.emit('newBlockHeader', blockHeader);
        } catch (error) {
          console.error('ブロックヘッダーの取得に失敗しました', error);
        }
      });
    });
  } else {
    console.log('既存のSocket.IOサーバーを使用します');
  }

  return NextResponse.json({ message: 'Socket.IOサーバーが起動しました' });
}
