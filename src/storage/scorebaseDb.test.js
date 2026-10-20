import {
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
} from './scorebaseDb'

beforeEach(async () => {
    await deleteScorebaseDatabase()
})

afterAll(async () => {
    await deleteScorebaseDatabase()
})

test('stores one replaceable local profile', async () => {
    await expect(getProfile()).resolves.toBeUndefined()

    await saveProfile('  Taylor Coach  ')
    await saveProfile('Morgan Leader')

    await expect(getProfile()).resolves.toMatchObject({
        id: 'current',
        displayName: 'Morgan Leader'
    })
})

test('rejects an empty local profile name', async () => {
    await expect(saveProfile('  ')).rejects.toThrow('A display name is required.')
})

test('creates, updates, and retrieves a complete quiz record', async () => {
    const createdQuiz = await createQuiz({
        name: 'Red vs Yellow',
        division: 'Experienced',
        rScore: 10,
        yScore: 20,
        quizTableData: [{ question: 1 }],
        notes: [],
        searchList: []
    })

    const updatedQuiz = await updateQuiz(createdQuiz.id, {
        name: 'Red vs Blue',
        rScore: 30
    })

    expect(createdQuiz.id).toEqual(expect.any(Number))
    expect(updatedQuiz).toMatchObject({
        id: createdQuiz.id,
        name: 'Red vs Blue',
        rScore: 30,
        division: 'Experienced',
        yScore: 20,
        quizTableData: [{ question: 1 }]
    })
    await expect(getQuiz(createdQuiz.id)).resolves.toEqual(updatedQuiz)
})

test('lists recent quizzes in descending save order and respects a limit', async () => {
    await createQuiz({ name: 'Old', savedAt: 10 })
    await createQuiz({ name: 'Newest', savedAt: 30 })
    await createQuiz({ name: 'Middle', savedAt: 20 })

    await expect(listQuizzes(2)).resolves.toEqual([
        expect.objectContaining({ name: 'Newest', savedAt: 30 }),
        expect.objectContaining({ name: 'Middle', savedAt: 20 })
    ])
})

test('creates, sorts, updates, and deletes quizzers', async () => {
    const zoe = await createQuizzer({ fullName: 'Zoe Zebra', division: 'Junior' })
    const alex = await createQuizzer({ fullName: 'Alex Able', division: 'Beginner' })

    await expect(listQuizzers()).resolves.toEqual([
        expect.objectContaining({ id: alex.id, fullName: 'Alex Able' }),
        expect.objectContaining({ id: zoe.id, fullName: 'Zoe Zebra' })
    ])

    await expect(updateQuizzer(zoe.id, { division: 'Experienced' })).resolves.toMatchObject({
        id: zoe.id,
        division: 'Experienced'
    })

    await deleteQuizzer(alex.id)
    await deleteQuiz(999)

    await expect(listQuizzers()).resolves.toEqual([
        expect.objectContaining({ id: zoe.id, division: 'Experienced' })
    ])
})