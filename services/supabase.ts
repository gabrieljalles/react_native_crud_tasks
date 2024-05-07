import "react-native-url-polyfill";
import {createClient} from '@supabase/supabase-js';

const supabaseUrl= 'https://bzderjmwhzhijnnmnefh.supabase.co'
const supabaseKey= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6ZGVyam13aHpoaWpubm1uZWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUwMDE4MzIsImV4cCI6MjAzMDU3NzgzMn0.dMLUXXL_L1BKpZfE4yxktxgLpXOSSjn36lnguPgan4M'

export const supabase = createClient(supabaseUrl, supabaseKey);