// api/webhook.ts
import { Bot, webhookCallback } from 'grammy';

// 1. Baca token (sesuai sama step 2)
const token = process.env.BOT_TOKEN;
if (!token) throw new Error('BOT_TOKEN is not set');

// 2. Bikin bot-nya
const bot = new Bot(token);

// 3. Command start biar dia bisa jawab
bot.command('start', async (ctx) => {
  await ctx.reply('Halo! Bot kamu udah hidup dan siap dipake! ✅');
});

// 4. Command buat ngetes API (biar tau ini buat APK)
bot.command('apikey', async (ctx) => {
  const url = `https://${process.env.VERCEL_URL}/api/validate`;
  await ctx.reply(`Gunakan URL ini untuk APK-mu:\n${url}`);
});

// 5. Ini biar Vercel bisa nerima pesanan dari Telegram
export const POST = webhookCallback(bot, 'std/http');
