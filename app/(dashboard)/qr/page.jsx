'use client';
const RED = '#CC0000';
const GRAY = '#f5f5f5';
export default function QRPage() {
  return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <h3 style={{ fontSize: 18 }}>QR স্ক্যান / পেমেন্ট</h3>
      <div style={{ width: 220, height: 220, background: '#000', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <svg width={180} height={180} viewBox="0 0 180 180">
          <rect x="10" y="10" width="60" height="60" fill="none" stroke="#fff" strokeWidth="8" rx="4"/>
          <rect x="25" y="25" width="30" height="30" fill="#fff" rx="2"/>
          <rect x="110" y="10" width="60" height="60" fill="none" stroke="#fff" strokeWidth="8" rx="4"/>
          <rect x="125" y="25" width="30" height="30" fill="#fff" rx="2"/>
          <rect x="10" y="110" width="60" height="60" fill="none" stroke="#fff" strokeWidth="8" rx="4"/>
          <rect x="25" y="125" width="30" height="30" fill="#fff" rx="2"/>
          {[80,90,100,110,120,130,140].map((x,i)=>[70,80,90,100,110,120,130,140].map((y,j)=>(i+j)%3===0&&<rect key={`${i}${j}`} x={x} y={y} width={8} height={8} fill="#fff"/>))}
        </svg>
        <div style={{ position: 'absolute', width: 40, height: 40, background: RED, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 900, fontSize: 18 }}>খ</div>
      </div>
      <div style={{ background: GRAY, borderRadius: 12, padding: 16, width: '100%', textAlign: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>ডিজিটাল খাতা</div>
        <div style={{ fontSize: 13, color: '#888' }}>বিকাশ, নগদ, রকেট, সব ব্যাংক থেকে পেমেন্ট নিন</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, width: '100%' }}>
        {[['📱','বিকাশ'],['🟠','নগদ'],['🟣','রকেট'],['🏦','ডাচ-বাংলা'],['🏛️','ব্র্যাক ব্যাংক'],['💳','যেকোনো ব্যাংক']].map(([ic,l],i)=>(
          <div key={i} style={{ background: GRAY, borderRadius: 12, padding: 14, textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{ic}</div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
