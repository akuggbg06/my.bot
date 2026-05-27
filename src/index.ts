import { Bot, Api, Context } from 'grammy';

const token = process.env.BOT_TOKEN;
if (!token) throw new Error('BOT_TOKEN is not set');

const bot = new Bot(token);

bot.command('start', async (ctx) => {
  await ctx.reply('Halo! Handler manual sukses nih! ✅');
});

bot.command('apikey', async (ctx) => {
  const url = `https://${process.env.VERCEL_URL}/api/validate`;
  await ctx.reply(`URL APK: ${url}`);
});

// INI HANDLER MANUALNYA
export async function POST(request: Request) {
  try {
    const update = await request.json();
    await bot.handleUpdate(update);
    return new Response(JSON.stringify({ status: 'ok' }), { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ status: 'error' }), { status: 200 }); // Tetap 200 biar ga diulang terus
  }
}
