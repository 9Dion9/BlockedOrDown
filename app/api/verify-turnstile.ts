export default async function handler(req, res) {
  const token = req.body.token;
  const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET;

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: `secret=${secret}&response=${token}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  const data = await response.json();
  res.json(data);
}