import { createBrowserClient } from '@supabase/ssr';

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function signUpWithPhone(phone, password, metadata) {
  return await supabase.auth.signUp({ phone, password, options: { data: metadata } });
}

export async function signInWithPhone(phone, password) {
  return await supabase.auth.signInWithPassword({ phone, password });
}

export async function signOut() {
  return await supabase.auth.signOut();
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function getBusiness(userId) {
  const { data, error } = await supabase.from('businesses').select('*').eq('user_id', userId).single();
  return { data, error };
}

export async function createBusiness(userId, bizData) {
  const { data, error } = await supabase.from('businesses').insert({ user_id: userId, ...bizData }).select().single();
  return { data, error };
}

export async function getContacts(businessId) {
  const { data, error } = await supabase.from('contacts').select('*').eq('business_id', businessId).order('created_at', { ascending: false });
  return { data: data || [], error };
}

export async function addContact(businessId, contact) {
  const { data, error } = await supabase.from('contacts').insert({ business_id: businessId, ...contact }).select().single();
  return { data, error };
}

export async function addCashTransaction(businessId, tx) {
  const { data, error } = await supabase.from('cash_transactions').insert({ business_id: businessId, ...tx }).select().single();
  return { data, error };
}

export async function getCashSummary(businessId, date) {
  const { data, error } = await supabase.from('cash_transactions').select('tx_type, amount').eq('business_id', businessId).eq('tx_date', date);
  if (error) return { data: null, error };
  const s = { cashSale:0, cashBuy:0, expense:0, ownerIn:0, ownerOut:0, dueCollected:0, paymentGiven:0 };
  (data||[]).forEach(tx => { if(s[tx.tx_type]!==undefined) s[tx.tx_type]+=parseFloat(tx.amount); });
  return { data: s, error: null };
}
