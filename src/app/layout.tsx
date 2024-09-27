// app/layout.tsx
export default function RootLayout({
	children,
  }: {
	children: React.ReactNode;
  }) {
	return (
	  <html lang="ja">
		<head>
		  <title>ブロックチェーンエクスプローラー</title>
		</head>
		<body>{children}</body>
	  </html>
	);
  }
  