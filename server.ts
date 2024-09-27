import express from 'express';
import next from 'next';
import http from 'http';
import { Server } from 'socket.io';
import provider from './src/utils/provider'; // TypeScriptファイルをインポート

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();
  const server = http.createServer(expressApp);
  const io = new Server(server);

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

  expressApp.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});
