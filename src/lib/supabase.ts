import { createClient } from '@supabase/supabase-js'

export const supaBase = createClient(
    'https://soeennyyogdezpwzacev.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvZWVubnl5b2dkZXpwd3phY2V2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjI3MjMwMCwiZXhwIjoyMDYxODQ4MzAwfQ.rIjSGrYWXb-z9b0viqIfeHwuIt-60SvLRUH-me580EA'
)