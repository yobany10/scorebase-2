import { calculateQuizzerValue, isSupportedDivision } from './quizScoring'

const slots = ['red', 'yellow'].flatMap(team => [1, 2, 3, 4, 5].map(number => `${team}${number}`))
const scoringFlags = ['correct', 'error', 'foul', 'quizOut']

const makeQuizResult = quiz => ({
    id: quiz.id,
    name: quiz.name || `${quiz.redName || 'Red'} vs ${quiz.yellowName || 'Yellow'}`,
    division: quiz.division,
    savedAt: quiz.savedAt,
    points: 0,
    correct: 0,
    errors: 0,
    fouls: 0,
    interruptions: 0,
    interruptedCorrect: 0,
    interruptedErrors: 0,
    quizOut: false,
    scoreAvailable: isSupportedDivision(quiz.division) && Array.isArray(quiz.quizTableData) && quiz.quizTableData.length > 0
})

export const calculateQuizzerStats = (quizzers, quizzes, division = 'all') => {
    const statsById = new Map(quizzers.map(quizzer => [quizzer.id, { quizzer, history: [] }]))

    quizzes.forEach(quiz => {
        if (!quiz || (division !== 'all' && quiz.division !== division)) return

        const resultsById = new Map()
        slots.forEach(slot => {
            const quizzerId = quiz[`${slot}Id`]
            if (quizzerId == null || !statsById.has(quizzerId)) return

            if (!resultsById.has(quizzerId)) resultsById.set(quizzerId, makeQuizResult(quiz))
            const result = resultsById.get(quizzerId)

            if (!Array.isArray(quiz.quizTableData)) return
            quiz.quizTableData.forEach(row => {
                const action = row && row[slot]
                if (!row || !action || typeof action !== 'object') {
                    result.scoreAvailable = false
                    return
                }

                if (action.correct === true) result.correct += 1
                if (action.error === true) result.errors += 1
                if (action.foul === true) result.fouls += 1
                if (action.interruption === true) {
                    result.interruptions += 1
                    if (action.correct === true) result.interruptedCorrect += 1
                    if (action.error === true) result.interruptedErrors += 1
                }
                if (action.quizOut === true) result.quizOut = true

                if (!Number.isInteger(row.question) || row.question < 1 || scoringFlags.some(flag => typeof action[flag] !== 'boolean')) {
                    result.scoreAvailable = false
                } else if (isSupportedDivision(quiz.division)) {
                    result.points += calculateQuizzerValue(row, slot, quiz.division)
                }
            })
        })

        resultsById.forEach((result, quizzerId) => {
            if (!result.scoreAvailable) result.points = null
            statsById.get(quizzerId).history.push(result)
        })
    })

    return Array.from(statsById.values()).map(({ quizzer, history }) => {
        history.sort((first, second) => (second.savedAt || 0) - (first.savedAt || 0))
        const totals = history.reduce((sum, result) => ({
            correct: sum.correct + result.correct,
            errors: sum.errors + result.errors,
            fouls: sum.fouls + result.fouls,
            interruptions: sum.interruptions + result.interruptions,
            interruptedCorrect: sum.interruptedCorrect + result.interruptedCorrect,
            interruptedErrors: sum.interruptedErrors + result.interruptedErrors,
            quizOuts: sum.quizOuts + (result.quizOut ? 1 : 0),
            errorOuts: sum.errorOuts + (result.errors >= 5 ? 1 : 0)
        }), { correct: 0, errors: 0, fouls: 0, interruptions: 0, interruptedCorrect: 0, interruptedErrors: 0, quizOuts: 0, errorOuts: 0 })
        const count = history.length
        const pointsAvailable = count > 0 && history.every(result => result.points !== null)
        const points = pointsAvailable ? history.reduce((sum, result) => sum + result.points, 0) : null
        const attempts = totals.correct + totals.errors
        const interruptedAttempts = totals.interruptedCorrect + totals.interruptedErrors

        return {
            quizzer, history, ...totals, quizCount: count, points,
            averagePoints: pointsAvailable ? points / count : null,
            averageCorrect: count ? totals.correct / count : null,
            averageErrors: count ? totals.errors / count : null,
            bestPoints: pointsAvailable ? Math.max(...history.map(result => result.points)) : null,
            bestCorrect: count ? Math.max(...history.map(result => result.correct)) : null,
            accuracy: attempts ? totals.correct / attempts : null,
            interruptionAccuracy: interruptedAttempts ? totals.interruptedCorrect / interruptedAttempts : null
        }
    })
}