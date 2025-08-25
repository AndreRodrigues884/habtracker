const grantDailyLoginXp = async (user) => {
  const today = new Date();

  if (user.lastLoginXpReward && user.lastLoginXpReward.toDateString() === today.toDateString()) {
    return false;
  }

  user.xp += 10;
  user.lastLoginXpReward = today;

  const xpPerLevel = 100;
  while (user.xp >= user.level * xpPerLevel) {
    user.level += 1;
  }

  await user.save();
  return true;
};

module.exports = {
  grantDailyLoginXp,
};
