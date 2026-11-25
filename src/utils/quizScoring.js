const LONG_DIVISIONS = ['Intermediate', 'Experienced', 'Senior']
const SUPPORTED_DIVISIONS = ['Beginner', 'Junior', ...LONG_DIVISIONS]

export const isSupportedDivision = division => SUPPORTED_DIVISIONS.includes(division)

export const calculateQuizzerValue = (item, quizzer, division) => {
    const question = item.question
    const isLongDivision = LONG_DIVISIONS.includes(division)
    const firstMiddleQuestion = isLongDivision ? 9 : 7
    const firstHighQuestion = isLongDivision ? 18 : 13
    const finalQuestion = isLongDivision ? 20 : 15
    const value = question > finalQuestion ? 20 : question >= firstHighQuestion ? 30 : question >= firstMiddleQuestion ? 20 : 10
    const result = item[quizzer]

    return (result.correct === true ? value : 0)
        - (result.error === true ? value / 2 : 0)
        - (result.foul === true ? 5 : 0)
        + (result.quizOut === true ? 10 : 0)
}