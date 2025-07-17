const Habit = require('../models/Habit');
const User = require('../models/User');
const { FrequencyEnum } = require('../enums/habit.enum');


const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find().sort({ createdAt: -1 }).populate('userId', 'name email');
    return res.status(200).json({ habits });
  } catch (error) {
    console.error(error);
    return res.error('GET_HABITS_FAILED');
  }
};


const createHabit = async (req, res) => {
  const {
    title,
    description = '',
    frequency,
    startDate = new Date(),
    intention = null,
    trigger = null,
  } = req.body;

  if (!title || !frequency) {
    return res.error('HABIT_MISSING_FIELDS');
  }

   if (!FrequencyEnum.includes(frequency)) {
    return res.error('HABIT_INVALID_FREQUENCY');
  }

  const habitExists = await Habit.findOne({ userId: req.user.userId, title });
    if (habitExists) {
      return res.error('HABIT_TITLE_ALREADY_EXISTS');
    }

  try {
    const habit = new Habit({
      userId: req.user.userId,
      title,
      description,
      frequency,
      startDate,
      intention,
      trigger,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await habit.save();

    await User.findByIdAndUpdate(
      req.user.userId,
      { $push: { associatedhabits: habit._id } }
    );

    return res.status(201).json({ message: 'Hábito criado com sucesso.', habit });
  } catch (error) {
    console.error(error);
    return res.error('HABIT_CREATION_FAILED');
  }
};

// Fazer update & delete habit do habito associado ao utilizador

/* 
Create	❌ Não	O hábito ainda não existe. És tu quem está a criar e a associar o teu userId ao novo hábito.
Update	✅ Sim	Precisas confirmar se és o dono do hábito que estás a tentar alterar.
Delete	✅ Sim	Precisas confirmar se és o dono do hábito que estás a tentar apagar. */


module.exports = {
    createHabit,
    getHabits,
};

