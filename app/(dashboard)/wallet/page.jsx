'use client';
const RED = '#CC0000';
const GRAY = '#f5f5f5';
export default function WalletPage() {
  const actions = [['➕','অ্যাড মানি'],['➡️','সেন্ড মানি'],['🏦','ব্যাংক\nট্রান্সফার'],['💳','ওয়ালেট\nট্রান্সফার']];
  const actions2 = [['📱','মোবাইল\nরিচার্জ'],['🛍️','পেমেন্ট'],['⬛','QR কোড']];
  return (
    <div style={{ padding: 16 }}>
      <div style={{ background: GRAY, borderRadius: 16, padding: 20, marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>একাউন্ট ব্যালেন্স</div>
          <div style={{ fontWeight: 800, fontSize: 28 }}>৳০.০০</div>
        </div>
        <div style={{ fontSize: 22, fontWeight: 900, color: RED }}>টালিপে™</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 16 }}>
        {actions.map(([ic,l],i)=>(
          <div key={i} style={{ textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: '#fff3e0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px', fontSize: 24 }}>{ic}</div>
            <div style={{ fontSize: 11, whiteSpace: 'pre-line', lineHeight: 1.3 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
        {actions2.map(([ic,l],i)=>(
          <div key={i} style={{ textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, background: '#fff3e0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 6px', fontSize: 24 }}>{ic}</div>
            <div style={{ fontSize: 11, whiteSpace: 'pre-line', lineHeight: 1.3 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ background: '#fff8e1', borderRadius: 12, padding: 16, textAlign: 'center' }}>
        <div style={{ fontWeight: 700, marginBottom: 4 }}>VISA • Mastercard • Amex</div>
        <div style={{ fontSize: 13, color: '#888' }}>ক্রেডিট কার্ড থেকে লেনদেন করুন টালিপে-তে</div>
      </div>
    </div>
  );
}
