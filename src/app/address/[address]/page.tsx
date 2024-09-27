// app/address/[address]/page.tsx
import { notFound } from 'next/navigation';
import provider from '../../../utils/provider';

interface AddressProps {
  params: { address: string };
}

export default async function AddressDetail({ params }: AddressProps) {
  const { address } = params;
  let balance;

  try {
    balance = await provider.getBalance(address);
  } catch {
    return notFound();
  }

  return (
    <div>
      <h1>アドレス詳細</h1>
      <p>残高: {balance.toString()}</p>
      {/* トランザクション履歴など */}
    </div>
  );
}
