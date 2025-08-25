const mongoose = require('mongoose');
const { AllAchievementNames } = require('../enums/achievement.enum');

const AchievementSchema = new mongoose.Schema({
    name: {
        type: String,
        enum: AllAchievementNames,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        enum: ['xp', 'streak', 'count'],
        required: true,
    },
    threshold: {
        type: Number,
        required: true,
    },
    rewardXp: {
        type: Number,
        default: 0 // XP a conceder quando desbloqueado
    },
    icon: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Achievement', AchievementSchema);

/* 🟡 Achievements do tipo xp (baseado em pontos de experiência acumulados)
Nível	Nome do Achievement	XP Threshold (exemplo)
1	Iniciante XP	50
2	Explorador de Hábitos	100
3	Viciado em Progresso	200
4	Mestre de Rotinas	300
5	Superador de Desafios	500
6	Guru da Disciplina	750
7	Mente Focada	1000
8	Lendário da Persistência	1500
9	Dominador de Hábitos	2000
10	Imparável XP	3000

🔵 Achievements do tipo streak (baseado em dias consecutivos)
Nível	Nome do Achievement	Streak (dias)
1	3 Dias Seguidos	3
2	1 Semana de Glória	7
3	Firme e Forte (10 dias)	10
4	Quinzena Focada	15
5	Conquistador de 3 Semanas	21
6	Um Mês sem Quebrar	30
7	50 Dias de Foco	50
8	Mestre da Consistência	75
9	100 Dias de Vitória	100
10	Lenda da Disciplina	150

🟢 Achievements do tipo count (hábitos concluídos)
Nível	Nome do Achievement	Count
1	Primeiro Passo	1
2	Começo Promissor	5
3	Rumo ao Sucesso	10
4	Progresso Visível	20
5	Rotina Formada	30
6	50 Conquistas Diárias	50
7	Centena de Ouro	100
8	Executor de Hábitos	150
9	Mestre dos 200	200
10	Conquistador de Hábitos	300 */
