// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import axiod from 'https://deno.land/x/axiod@0.26.2/mod.ts';

serve(async (req) => {
  const body = await req.json();
  const { id, email } = body.record;

  const apiUrl = Deno.env.get('API_URL') as string;
  const apiKey = Deno.env.get('API_KEY') as string;

  await axiod.post(
    `${apiUrl}/workers/register`,
    { id, email, name: email },
    { headers: { 'x-api-key': apiKey } },
  );

  return new Response(null, { status: 204 });
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
