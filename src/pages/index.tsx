// src/pages/index.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import LatestBlockHeader from '@/components/LatestBlockHeader'; 

const Home = () => {
  const [input, setInput] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (input.startsWith('0x') && input.length === 66) {
      router.push(`/transaction/${input}`);
    } else if (input.startsWith('0x') && input.length === 42) {
      router.push(`/address/${input}`);
    } else {
      alert('invalid input');
    }
  };

  return (
    <div>
      <h1>ブロックチェーンエクスプローラー</h1>
      <LatestBlockHeader/>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="トランザクションハッシュまたはアドレスを入力" />
      <button onClick={handleSearch}>検索</button>
    </div>
  );
};

export default Home;
