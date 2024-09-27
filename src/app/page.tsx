// app/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LatestBlockHeader from '../components/LatestBlockHeader';

export default function HomePage() {
  const [input, setInput] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (input.startsWith('0x') && input.length === 66) {
      router.push(`/transaction/${input}`);
    } else if (input.startsWith('0x') && input.length === 42) {
      router.push(`/address/${input}`);
    } else {
      alert('無効な入力です');
    }
  };

  return (
    <div>
      <h1>ブロックチェーンエクスプローラー</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="トランザクションハッシュまたはアドレスを入力"
      />
      <button onClick={handleSearch}>検索</button>
      <LatestBlockHeader />
    </div>
  );
}
