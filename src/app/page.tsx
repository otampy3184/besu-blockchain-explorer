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
        <div className="w-screen h-max  bg-gradient-to-tr to-blue-400 from-blue-500">
            <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
                <nav className="my-16 animate-fade-in">
                </nav>
                {/* <Particles
                className="absolute inset-0 -z-10 animate-fade-in"
                quantity={100}
            /> */}
                <div className="w-max max-w-full px-4">
                    <h1 className="whitespace-nowrap pr-9 text-2xl sm:text-3xl text-white font-bold text-center">
                        HyperLedger Besu - BlockChain Explorer
                    </h1>
                </div>
                <div className="my-16 text-center animate-fade-in  text-white font-bold text-center">
                    <LatestBlockHeader/>
                </div>
            </div>
        </div>
    );
}
