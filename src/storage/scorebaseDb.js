import { deleteDB, openDB } from 'idb'

const DATABASE_NAME = 'scorebase'
const DATABASE_VERSION = 1
const PROFILE_STORE = 'profile'
const QUIZ_STORE = 'quizzes'
const QUIZZER_STORE = 'quizzers'

let databasePromise

const getDatabase = () => {
    if (!databasePromise) {
        databasePromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
            upgrade(database) {
                const profileStore = database.createObjectStore(PROFILE_STORE, { keyPath: 'id' })
                profileStore.createIndex('updatedAt', 'updatedAt')

                const quizStore = database.createObjectStore(QUIZ_STORE, { keyPath: 'id', autoIncrement: true })
                quizStore.createIndex('savedAt', 'savedAt')

                const quizzerStore = database.createObjectStore(QUIZZER_STORE, { keyPath: 'id', autoIncrement: true })
                quizzerStore.createIndex('fullName', 'fullName')
                quizzerStore.createIndex('createdAt', 'createdAt')
            }
        })
    }

    return databasePromise
}

const getProfile = async () => {
    const database = await getDatabase()
    return database.get(PROFILE_STORE, 'current')
}

const saveProfile = async (displayName) => {
    const normalizedDisplayName = displayName.trim()

    if (!normalizedDisplayName) {
        throw new Error('A display name is required.')
    }

    const profile = {
        id: 'current',
        displayName: normalizedDisplayName,
        updatedAt: Date.now()
    }
    const database = await getDatabase()
    await database.put(PROFILE_STORE, profile)

    return profile
}

const listQuizzes = async (limit) => {
    const database = await getDatabase()
    const quizzes = await database.getAll(QUIZ_STORE)
    const sortedQuizzes = quizzes.sort((firstQuiz, secondQuiz) => secondQuiz.savedAt - firstQuiz.savedAt)

    return typeof limit === 'number' ? sortedQuizzes.slice(0, limit) : sortedQuizzes
}

const getQuiz = async (id) => {
    const database = await getDatabase()
    return database.get(QUIZ_STORE, Number(id))
}

const createQuiz = async (quiz) => {
    const database = await getDatabase()
    const savedAt = quiz.savedAt || Date.now()
    const id = await database.add(QUIZ_STORE, { ...quiz, savedAt })

    return { ...quiz, id, savedAt }
}

const updateQuiz = async (id, quiz) => {
    const database = await getDatabase()
    const existingQuiz = await database.get(QUIZ_STORE, Number(id))

    if (!existingQuiz) {
        throw new Error('The saved quiz could not be found.')
    }

    const updatedQuiz = {
        ...existingQuiz,
        ...quiz,
        id: existingQuiz.id,
        savedAt: quiz.savedAt || Date.now()
    }
    await database.put(QUIZ_STORE, updatedQuiz)

    return updatedQuiz
}

const deleteQuiz = async (id) => {
    const database = await getDatabase()
    await database.delete(QUIZ_STORE, Number(id))
}

const listQuizzers = async () => {
    const database = await getDatabase()
    const quizzers = await database.getAll(QUIZZER_STORE)

    return quizzers.sort((firstQuizzer, secondQuizzer) => {
        return firstQuizzer.fullName.localeCompare(secondQuizzer.fullName)
    })
}

const createQuizzer = async (quizzer) => {
    const database = await getDatabase()
    const createdAt = quizzer.createdAt || Date.now()
    const id = await database.add(QUIZZER_STORE, { ...quizzer, createdAt })

    return { ...quizzer, id, createdAt }
}

const updateQuizzer = async (id, quizzer) => {
    const database = await getDatabase()
    const existingQuizzer = await database.get(QUIZZER_STORE, Number(id))

    if (!existingQuizzer) {
        throw new Error('The quizzer could not be found.')
    }

    const updatedQuizzer = {
        ...existingQuizzer,
        ...quizzer,
        id: existingQuizzer.id
    }
    await database.put(QUIZZER_STORE, updatedQuizzer)

    return updatedQuizzer
}

const deleteQuizzer = async (id) => {
    const database = await getDatabase()
    await database.delete(QUIZZER_STORE, Number(id))
}

const deleteScorebaseDatabase = async () => {
    if (databasePromise) {
        const database = await databasePromise
        database.close()
        databasePromise = undefined
    }

    await deleteDB(DATABASE_NAME)
}

export {
    createQuiz,
    createQuizzer,
    deleteQuiz,
    deleteQuizzer,
    deleteScorebaseDatabase,
    getProfile,
    getQuiz,
    listQuizzers,
    listQuizzes,
    saveProfile,
    updateQuiz,
    updateQuizzer
}