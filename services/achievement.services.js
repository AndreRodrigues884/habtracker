const Achievement = require('../models/Achievements');

const calculateLevelFromXpThreshold = (threshold) => {
  // Exemplo: 100 XP por nível
  return Math.floor(threshold / 100) + 1;
};

const grantXpAndCheckLevelUp = async (user, xpAmount) => {
  user.xp += xpAmount;

  // Calcular o novo nível com base no XP
  const newLevel = calculateLevelFromXpThreshold(user.xp);

  if (newLevel > user.level) {
    user.level = newLevel;
    // Aqui pode disparar um evento, enviar notificação ou algo do tipo
  }

  await user.save();

  return { xpGranted: xpAmount, newLevel };
};


const checkAndUnlockAchievements = async (user, habit = null) => {
  try {
    const allAchievements = await Achievement.find();
    const alreadyUnlockedIds = user.achievementsUnlocked.map(a => a.toString());
    const newlyUnlocked = [];

    for (const achievement of allAchievements) {
      if (alreadyUnlockedIds.includes(achievement._id.toString())) continue;

      let qualifies = false;

      switch (achievement.type) {
        case 'xp':
          if (user.xp >= achievement.threshold) {
            qualifies = true;
          }
          break;

        case 'count':
          if (user.habitsCompletedCount >= achievement.threshold) {
            qualifies = true;
          }
          break;

        case 'streak':
          if (habit && habit.currentStreak >= achievement.threshold) {
            qualifies = true;
          }
          break;
      }

      if (qualifies) {
        user.achievementsUnlocked.push(achievement._id);

        // Aplica recompensa de XP via função centralizada
        const xpReward = achievement.rewardXp || Math.floor(achievement.threshold * 1.5);
        await grantXpAndCheckLevelUp(user, xpReward);

        newlyUnlocked.push({
          ...achievement.toObject(),
          xpReward
        });
      }
    }

    return newlyUnlocked;
  } catch (err) {
    console.error('Erro ao verificar conquistas:', err);
    return [];
  }
};


module.exports = { checkAndUnlockAchievements, grantXpAndCheckLevelUp };

/* 1. calculateLevelFromXpThreshold(threshold)
O que faz:
Calcula o nível do usuário baseado em um valor de XP (threshold).
Exemplo: para cada 100 XP, sobe 1 nível.

2. grantXpAndCheckLevelUp(user, xpAmount)
O que faz:
Adiciona a quantidade de XP recebida (xpAmount) ao XP atual do usuário.
Depois, verifica se o novo total de XP permite subir de nível e atualiza o nível, se for o caso.
Salva as alterações no banco.
Retorna a quantidade de XP concedida e o novo nível do usuário.

3. checkAndUnlockAchievements(user, habit = null)
O que faz:
Verifica todos os achievements cadastrados para descobrir quais o usuário ainda não desbloqueou.
Para cada achievement, verifica se o usuário (ou o hábito, no caso de achievements do tipo "streak") cumpre os requisitos (XP, streak, count).
Se o usuário qualificar para um achievement, adiciona-o à lista de achievements desbloqueados e concede a recompensa de XP usando a função grantXpAndCheckLevelUp.
Retorna uma lista dos achievements que foram desbloqueados nessa verificação. */