'use client';
import { useRouter, usePathname } from 'next/navigation';

const RED = '#CC0000';

const navItems = [
  { key: 'tali',    label: 'টালি',      emoji: '📒',  path: '/tali' },
  { key: 'cashbox', label: 'ক্যাশবক্স', emoji: '💼',  path: '/cashbox' },
  { key: 'qr',      label: 'QR স্ক্যান', emoji: '⬛',  path: '/qr', special: true },
  { key: 'wallet',  label: 'ওয়ালেট',    emoji: '💳',  path: '/wallet' },
  { key: 'menu',    label: 'মেনু',       emoji: '☰',   path: '/menu' },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {navItems.map(item => {
        const active = pathname === item.path;
        return (
          <button key={item.key} className={`nav-item ${active ? 'active' : ''}`}
            onClick={() => router.push(item.path)}>
            {item.special ? (
              <div style={{ width: 44, height: 44, borderRadius: 12, background: active ? RED : '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: -8, fontSize: 20 }}>
                {item.emoji}
              </div>
            ) : (
              <span style={{ fontSize: 22, filter: active ? 'none' : 'grayscale(1) opacity(0.5)' }}>{item.emoji}</span>
            )}
            <span className="label" style={{ color: active ? RED : '#888' }}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
