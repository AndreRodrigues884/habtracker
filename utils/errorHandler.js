const errorHandler = {
    // Login and Registration Errors
    LOGIN_MISSING_FIELDS: {
        message: 'Email ou password em falta.',
        status: 400,
    },
    LOGIN_INVALID_CREDENTIALS: {
        message: 'Credenciais inválidas.',
        status: 401,
    },
    LOGIN_USER_NOT_FOUND: {
        message: 'Utilizador não encontrado.',
        status: 404,
    },
    LOGIN_SERVER_ERROR: {
        message: 'Erro interno no login.',
        status: 500,
    },
    REGISTER_MISSING_FIELDS: {
        message: 'Nome, email e senha são obrigatórios.',
        status: 400,
    },
    REGISTER_INVALID_EMAIL: {
        message: 'Formato de email inválido.',
        status: 400,
    },
    REGISTER_INVALID_PASSWORD: {
        message: 'Password não cumpre os requisitos.',
        status: 400,
    },
    REGISTER_DUPLICATE_EMAIL: {
        message: 'Este email já está em uso.',
        status: 409,
    },
    REGISTER_SERVER_ERROR: {
        message: 'Erro no servidor ao registrar utilizador.',
        status: 500,
    },

    // User Management Errors
    USER_NOT_FOUND: {
        status: 404,
        message: 'Utilizador não encontrado.'
    },
    USER_GET_HABITS_FAILED: {
        status: 500,
        message: 'Erro ao obter hábitos do utilizador.'
    },
    USER_UNAUTHORIZED_ACTION: {
        status: 403,
        message: 'Utilizador não autorizado a realizar esta ação.'
    },
    GRANT_DAILY_XP_FAILED: {
        status: 500,
        message: 'Erro ao atribuir XP diário.',
    },

    //Habit Management Errors
    HABIT_CREATION_FAILED: {
        message: 'Erro ao criar hábito.',
        status: 500,
    },
    HABIT_MISSING_FIELDS: {
        message: 'Título e frequência são obrigatórios.',
        status: 400,
    },
    HABIT_INVALID_FREQUENCY: {
        message: 'Frequência inválida.',
        status: 400
    },
     HABIT_INVALID_CATEGORY: {
        status: 400,
        message: 'Categoria inválida.'
    },
    HABIT_TITLE_ALREADY_EXISTS: {
        message: 'Já existe um hábito com este título.',
        status: 409
    },
    GET_HABITS_FAILED: {
        status: 500,
        message: 'Erro ao buscar hábitos.'
    },
    HABIT_NOT_FOUND: {
        status: 404,
        message: 'Hábito não encontrado.'
    },
    HABIT_DELETE_FAILED: {
        status: 500,
        message: 'Erro ao eliminar o hábito.'
    },
    HABIT_UPDATE_FAILED: {
        status: 500,
        message: 'Erro ao atualizar hábito.'
    },
    HABIT_ALREADY_COMPLETED_TODAY: {
        status: 400,
        message: 'Hábito já foi concluído hoje.'
    },
    HABIT_COMPLETION_FAILED: {
        status: 500,
        message: 'Erro ao marcar hábito como concluído.'
    },

    //Achievement Management Errors
    FETCH_ACHIEVEMENTS_FAILED: {
        status: 500,
        message: 'Erro ao buscar conquistas.'
    },
    ACHIEVEMENT_INVALID_TYPE: {
        status: 400,    
        message: 'Tipo de conquista inválido.'
    },
    ACHIEVEMENT_MISSING_FIELDS: {
        status: 400,
        message: 'Todos os campos obrigatórios devem ser preenchidos.',
    },
    ACHIEVEMENT_INVALID_TYPE: {
        status: 400,
        message: 'Tipo de conquista inválido.',
    },
    ACHIEVEMENT_ALREADY_EXISTS: {
        status: 409,
        message: 'Já existe uma conquista com esse nome.',
    },
    ACHIEVEMENT_INVALID_NAME_FOR_TYPE: {
        status: 400,
        message: 'Nome de conquista inválido para o tipo selecionado.',
    },
    ACHIEVEMENT_CREATION_FAILED: {
        status: 500,
        message: 'Erro ao criar conquista.',
    },

    //Token Errors
    AUTH_TOKEN_MISSING: {
        message: 'Token não fornecido.',
        status: 401,
    },
    AUTH_TOKEN_INVALID: {
        message: 'Token inválido ou expirado.',
        status: 401,
    },

    //Admin Errors
    NOT_AUTHORIZED_ADMIN: {
        status: 403,
        message: 'Apenas administradores têm permissão para aceder a esta rota.'
    },
    GET_USERS_FAILED: {
        status: 500,
        message: 'Erro ao obter lista de utilizadores.',
    },
};

module.exports = errorHandler;
