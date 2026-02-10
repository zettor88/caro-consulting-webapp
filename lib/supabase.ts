
import { createClient } from '@supabase/supabase-js';

// Usamos las variables de entorno que están en .env.local
// IMPORTANTE: En el cliente (frontend) solo se debe usar la clave ANON (Pública), nunca la SERVICE_ROLE (Privada).
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
