import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://yqrwpxqbaxapsofkwbvo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxcndweHFiYXhhcHNvZmt3YnZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMxNzg0NDksImV4cCI6MjAxODc1NDQ0OX0.sDMGMwSo_HWwyRr7DBtY5blpTQeCJ0O1LejfoeXtiv8'
const supabase = createClient(supabaseUrl, supabaseAnonKey)
export default supabase
