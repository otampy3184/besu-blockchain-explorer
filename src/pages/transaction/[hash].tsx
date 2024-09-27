// // src/pages/transaction/[hash].tsx
// import { useRouter } from 'next/router';
// import useSWR from 'swr';

// const TransactionDetail = () => {
//   const router = useRouter();
//   const { hash } = router.query;
//   const { data, error } = useSWR(hash ? `/api/transaction/${hash}` : null);

//   if (error) return <div>エラーが発生しました</div>;
//   if (!data) return <div>読み込み中...</div>;

//   return (
//     <div>
//       <h1>トランザクション詳細</h1>
//       {/* トランザクション情報を表示 */}
//     </div>
//   );
// };

// export default TransactionDetail;
