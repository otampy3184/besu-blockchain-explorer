// app/transaction/[hash]/page.tsx
import { notFound } from 'next/navigation';
import provider from '../../../utils/provider';

interface TransactionProps {
  params: { hash: string };
}

export default async function TransactionDetail({ params }: TransactionProps) {
  const { hash } = params;
  let transaction;

  try {
    transaction = await provider.getTransaction(hash);
  } catch {
    return notFound();
  }

  if (!transaction) {
    return notFound();
  }

  return (
    <div>
      <h1>トランザクション詳細</h1>
      {/* トランザクション情報を表示 */}
    </div>
  );
}
