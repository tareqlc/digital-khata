'use client';
import { useRouter } from 'next/navigation';

const RED = '#CC0000';

export default function RedHeader({ bizName = 'ব্যবসা', plan = 'স্ট্যান্ডার্ড' }) {
  const router = useRouter();
  return (
    <header style={{ background: RED, padding: '12px 16px', flexShrink: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 20, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{bizName.toUpperCase()}</span>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>▾</span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 12 }}>{plan}</span>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <button onClick={() => {}} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center' }}>
            <div style={{ fontSize: 22 }}>✉️</div>
            <div style={{ fontSize: 10, color: '#fff' }}>ইনবক্র</div>
          </button>
          <button onClick={() => {}} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center' }}>
            <div style={{ fontSize: 22 }}>😊</div>
            <div style={{ fontSize: 10, color: '#fff' }}>হেল্প</div>
          </button>
        </div>
      </div>
    </header>
  );
}
