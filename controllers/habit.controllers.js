const Habit = require('../models/Habit');

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
    return res.status(400).json({ message: 'Título e frequência são obrigatórios.' });
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

    return res.status(201).json({ message: 'Hábito criado com sucesso.', habit });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar hábito.' });
  }
};



module.exports = {
    createHabit,
};

