const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once(Events.ClientReady, () => {
  console.log(`ログインしました: ${client.user.tag}`);
});

// =========================
// 「過去問」で呼び出し
// =========================

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  const text = message.content.trim();

  if (text !== '過去問') return;

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('univ_waseda')
      .setLabel('早稲田大学')
      .setStyle(ButtonStyle.Primary)
  );

  await message.channel.send({
    content:
      '🎓 **過去問検索**\n' +
      '大学を選択してください。',
    components: [row]
  });
});

// =========================
// ボタン処理
// =========================

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isButton()) return;

  // 早稲田大学
  if (interaction.customId === 'univ_waseda') {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('faculty_waseda_commerce')
        .setLabel('商学部')
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.update({
      content:
        '🏫 **早稲田大学**\n' +
        '学部を選択してください。',
      components: [row]
    });

    return;
  }

  // 商学部
  if (interaction.customId === 'faculty_waseda_commerce') {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('year_2025')
        .setLabel('2025年度')
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.update({
      content:
        '📘 **早稲田大学 商学部**\n' +
        '年度を選択してください。',
      components: [row]
    });

    return;
  }

  // 2025年度
  if (interaction.customId === 'year_2025') {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('subject_english')
        .setLabel('英語')
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.update({
      content:
        '📅 **2025年度**\n' +
        '科目を選択してください。',
      components: [row]
    });

    return;
  }

  // 英語
  if (interaction.customId === 'subject_english') {
    await interaction.update({
      content:
        '✅ **早稲田大学 商学部 2025年度 英語**\n' +
        'ここまでの条件選択は成功です。\n' +
        '次に東進への自動ログイン処理を接続します。',
      components: []
    });

    return;
  }
});

client.login(process.env.DISCORD_TOKEN);
