
const updateHabitAndUserProgress = (habit, user, today = new Date()) => {
  const last = habit.lastCompletionDate ? new Date(habit.lastCompletionDate) : null;
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Atualizar streak
  if (last && last.toDateString() === yesterday.toDateString()) {
    habit.currentStreak += 1;
  } else {
    habit.currentStreak = 1;
  }

  // Atualizar longest streak
  habit.longestStreak = Math.max(habit.longestStreak, habit.currentStreak);

  // Atualizar contadores e datas
  habit.completedCount += 1;
  habit.lastCompletionDate = today;

  user.habitsCompletedCount += 1;
  user.lastHabitCompletionDate = today;

  // Retornar última data para possível uso externo
  return { lastCompletionDate: last };
};

module.exports = { updateHabitAndUserProgress };