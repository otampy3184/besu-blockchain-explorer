import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:4000';

interface BlockHeader {
    number: number;
    hash: string;
    parentHash: string;
    miner: string;
    timestamp: number;
    transactions: number;
}

const LatestBlockHeader = () => {
  const [blockHeader, setBlockHeader] = useState<BlockHeader | null>(null);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    socket.on('connect', () => {
      console.log('WebSocket接続が確立されました');
    });

    socket.on('newBlockHeader', (data: BlockHeader) => {
      setBlockHeader(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

    if (!blockHeader) {
        return <div>最新のブロックヘッダーを取得中...</div>;
    }

    return (
        <div>
            <h2>最新のブロックヘッダー</h2>
            <ul>
                <li>ブロック番号: {blockHeader.number}</li>
                <li>ブロックハッシュ: {blockHeader.hash}</li>
                <li>親ブロックハッシュ: {blockHeader.parentHash}</li>
                <li>マイナー: {blockHeader.miner}</li>
                <li>タイムスタンプ: {new Date(blockHeader.timestamp * 1000).toLocaleString()}</li>
                <li>トランザクション数: {blockHeader.transactions}</li>
            </ul>
        </div>
    );
};

export default LatestBlockHeader;
