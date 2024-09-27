import http from 'http';
import { Server } from 'socket.io';
import provider from './src/utils/provider';

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Next.jsアプリのURL
    methods: ['GET', 'POST'],
  },
});

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

server.listen(4000, () => {
  console.log('Socket.IOサーバーがポート4000で起動しました');
});
