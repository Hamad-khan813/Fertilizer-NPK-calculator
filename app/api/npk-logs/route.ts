import { NextResponse } from 'next/server';
import { createClient } from '../../lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data, error } = await supabase
    .from('npk_logs')
    .select('*')
    .order('application_date', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { use_case, fertilizer_id, amount_g, volume_l, target_n, target_p, target_k, notes, application_date } = body;

    const { data, error } = await supabase
      .from('npk_logs')
      .insert({
        user_id: user.id,
        use_case,
        fertilizer_id,
        amount_g,
        volume_l,
        target_n,
        target_p,
        target_k,
        notes,
        application_date: application_date || new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
