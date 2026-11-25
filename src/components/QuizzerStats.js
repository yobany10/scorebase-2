import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { listQuizzers, listQuizzes } from '../storage/scorebaseDb'
import { calculateQuizzerStats } from '../utils/quizzerStats'
import './QuizzerStats.css'

const formatNumber = value => value == null ? '-' : Number(value.toFixed(1)).toLocaleString()
const formatPercent = value => value == null ? '-' : `${Math.round(value * 100)}%`
const formatDate = value => {
    const date = new Date(value)
    return value && !Number.isNaN(date.getTime()) ? date.toLocaleDateString() : '-'
}

const StatGroup = ({ title, items }) => (
    <section className='quizzer-stats-group'>
        <h3>{title}</h3>
        <dl>
            {items.map(([label, value]) => (
                <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                </div>
            ))}
        </dl>
    </section>
)

const PointsTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null
    const result = payload[0].payload

    return (
        <div className='quizzer-stats-tooltip'>
            <strong>{result.name}</strong>
            <span>Last saved: {formatDate(result.savedAt)}</span>
            <span>Points: {formatNumber(result.points)}</span>
        </div>
    )
}

const QuizzerCharts = ({ stats }) => {
    const recentHistory = stats.history.slice(0, 12).reverse()
    const pointsData = recentHistory.map((result, index) => ({
        ...result,
        sequence: stats.history.length - recentHistory.length + index + 1
    }))
    const hasPoints = pointsData.some(result => result.points != null)
    const hasMissingPoints = pointsData.some(result => result.points == null)
    const answers = [
        { name: 'Correct', value: stats.correct, color: '#237b68' },
        { name: 'Errors', value: stats.errors, color: '#c76b52' }
    ]
    const hasAnswers = stats.correct + stats.errors > 0

    return (
        <div className='quizzer-stats-charts'>
            <section className='quizzer-stats-chart' aria-labelledby='quizzer-stats-points-chart-title'>
                <div className='quizzer-stats-chart-heading'>
                    <h3 id='quizzer-stats-points-chart-title'>Points by quiz</h3>
                    <span>Latest {pointsData.length} saved {pointsData.length === 1 ? 'quiz' : 'quizzes'}</span>
                </div>
                {hasPoints ? <>
                    <div className='quizzer-stats-points-chart'>
                        <ResponsiveContainer width='100%' height='100%' minWidth={0}>
                            <BarChart data={pointsData} accessibilityLayer aria-label='Points by saved quiz, oldest to newest' margin={{ top: 8, right: 4, bottom: 0, left: 0 }}>
                                <CartesianGrid vertical={false} stroke='#dce2e2' strokeDasharray='3 3' />
                                <XAxis dataKey='sequence' tickFormatter={value => `#${value}`} tickLine={false} axisLine={false} tick={{ fill: '#5d6767', fontSize: 11 }} />
                                <YAxis domain={[dataMin => Math.min(0, dataMin), dataMax => Math.max(0, dataMax)]} allowDecimals={false} width={38} tickLine={false} axisLine={false} tick={{ fill: '#5d6767', fontSize: 11 }} />
                                <ReferenceLine y={0} stroke='#aab5b5' />
                                <Tooltip content={<PointsTooltip />} cursor={{ fill: '#e7eef6' }} />
                                <Bar dataKey='points' name='Points' fill='#2563eb' maxBarSize={30} radius={[3, 3, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    {hasMissingPoints && <p className='quizzer-stats-chart-note'>Some saved quizzes have unavailable points.</p>}
                </> : <p className='quizzer-stats-chart-empty'>Points are unavailable for these saved quizzes.</p>}
            </section>
            <section className='quizzer-stats-chart' aria-labelledby='quizzer-stats-answers-chart-title'>
                <div className='quizzer-stats-chart-heading'>
                    <h3 id='quizzer-stats-answers-chart-title'>Answer breakdown</h3>
                    <span>{stats.quizCount} saved {stats.quizCount === 1 ? 'quiz' : 'quizzes'}</span>
                </div>
                {hasAnswers ? <div className='quizzer-stats-answer-chart'>
                    <div className='quizzer-stats-donut'>
                        <ResponsiveContainer width='100%' height='100%' minWidth={0}>
                            <PieChart accessibilityLayer aria-label='Correct answers and errors'>
                                <Pie data={answers} dataKey='value' nameKey='name' innerRadius='68%' outerRadius='92%' paddingAngle={answers.every(answer => answer.value > 0) ? 2 : 0} stroke='none'>
                                    {answers.map(answer => <Cell key={answer.name} fill={answer.color} />)}
                                </Pie>
                                <Tooltip formatter={value => formatNumber(value)} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className='quizzer-stats-donut-center' aria-hidden='true'><strong>{formatPercent(stats.accuracy)}</strong><span>accuracy</span></div>
                    </div>
                    <dl className='quizzer-stats-answer-legend'>
                        {answers.map(answer => <div key={answer.name}>
                            <dt><span className={`quizzer-stats-answer-swatch quizzer-stats-answer-swatch-${answer.name.toLowerCase()}`} aria-hidden='true' />{answer.name}</dt>
                            <dd>{formatNumber(answer.value)}</dd>
                        </div>)}
                    </dl>
                </div> : <p className='quizzer-stats-chart-empty'>No answers recorded.</p>}
            </section>
        </div>
    )
}

const QuizzerStats = () => {
    const [quizzers, setQuizzers] = useState([])
    const [quizzes, setQuizzes] = useState([])
    const [loadState, setLoadState] = useState('loading')
    const [loadAttempt, setLoadAttempt] = useState(0)
    const [search, setSearch] = useState('')
    const [division, setDivision] = useState('all')
    const [sort, setSort] = useState('name')
    const [selectedId, setSelectedId] = useState(null)

    useEffect(() => {
        let isMounted = true
        setLoadState('loading')
        Promise.all([listQuizzers(), listQuizzes()])
            .then(([savedQuizzers, savedQuizzes]) => {
                if (!isMounted) return
                setQuizzers(savedQuizzers)
                setQuizzes(savedQuizzes)
                setLoadState('ready')
            })
            .catch(error => {
                console.error(error)
                if (isMounted) setLoadState('error')
            })
        return () => { isMounted = false }
    }, [loadAttempt])

    const divisions = [...new Set(quizzes.map(quiz => quiz.division).filter(Boolean))].sort()
    const allStats = calculateQuizzerStats(quizzers, quizzes, division)
    const filteredStats = allStats
        .filter(stat => stat.quizzer.fullName.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()))
        .sort((first, second) => {
            if (sort !== 'name') {
                const firstValue = first[sort]
                const secondValue = second[sort]
                if (firstValue == null && secondValue != null) return 1
                if (firstValue != null && secondValue == null) return -1
                if (firstValue !== secondValue) return secondValue - firstValue
            }
            return first.quizzer.fullName.localeCompare(second.quizzer.fullName)
        })
    const selected = filteredStats.find(stat => stat.quizzer.id === selectedId) || filteredStats[0]

    return (
        <main className='quizzer-stats-page'>
            <header className='quizzer-stats-header'>
                <div>
                    <h1>Quizzer Stats</h1>
                    <p>Saved quizzes, including partial saves and rostered substitutes</p>
                </div>
                <Link to='/dashboard'>Saved Quizzes</Link>
            </header>
            {loadState === 'loading' && <p role='status'>Loading stats...</p>}
            {loadState === 'error' && <div role='alert'><p>Unable to load stats.</p><button type='button' className='secondary-button' onClick={() => setLoadAttempt(attempt => attempt + 1)}>Try again</button></div>}
            {loadState === 'ready' && quizzers.length === 0 && <div className='quizzer-stats-empty'><h2>No quizzers yet</h2><Link to='/scorekeeping'>Add a quizzer</Link></div>}
            {loadState === 'ready' && quizzers.length > 0 && <>
                {quizzes.length === 0 && <p className='quizzer-stats-notice'>No saved quizzes yet.</p>}
                <div className='quizzer-stats-filters'>
                    <label>Search quizzers<input type='search' value={search} onChange={event => setSearch(event.target.value)} placeholder='Search by name' /></label>
                    <label>Division<select value={division} onChange={event => setDivision(event.target.value)}><option value='all'>All divisions</option>{divisions.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
                    <label>Sort by<select value={sort} onChange={event => setSort(event.target.value)}><option value='name'>Name</option><option value='quizCount'>Saved quizzes</option><option value='points'>Points</option><option value='averagePoints'>Points per quiz</option><option value='accuracy'>Accuracy</option></select></label>
                </div>
                {filteredStats.length === 0 ? <p className='quizzer-stats-empty'>No matching quizzers.</p> :
                    <div className='quizzer-stats-layout'>
                        <section className='quizzer-stats-overview' aria-labelledby='quizzer-stats-overview-title'>
                            <h2 id='quizzer-stats-overview-title'>Quizzers <span>{filteredStats.length}</span></h2>
                            <div className='quizzer-stats-table-wrap'>
                                <table className='quizzer-stats-table'>
                                    <thead><tr><th scope='col'>Quizzer</th><th scope='col'>Quizzes</th><th scope='col'>Points</th><th scope='col'>Avg</th><th scope='col'>Accuracy</th></tr></thead>
                                    <tbody>{filteredStats.map(stat => <tr key={stat.quizzer.id} className={selected.quizzer.id === stat.quizzer.id ? 'is-selected' : undefined}>
                                        <th scope='row'><button type='button' aria-pressed={selected.quizzer.id === stat.quizzer.id} onClick={() => setSelectedId(stat.quizzer.id)}>{stat.quizzer.fullName}</button></th>
                                        <td>{stat.quizCount}</td><td>{formatNumber(stat.points)}</td><td>{formatNumber(stat.averagePoints)}</td><td>{formatPercent(stat.accuracy)}</td>
                                    </tr>)}</tbody>
                                </table>
                            </div>
                        </section>
                        <section className='quizzer-stats-detail' aria-labelledby='quizzer-stats-detail-title'>
                            <div className='quizzer-stats-detail-header'><div><p>Quizzer</p><h2 id='quizzer-stats-detail-title'>{selected.quizzer.fullName}</h2></div><span>{selected.quizCount} saved {selected.quizCount === 1 ? 'quiz' : 'quizzes'}</span></div>
                            {selected.quizCount === 0 ? <p className='quizzer-stats-no-history'>No saved quizzes for this quizzer{division !== 'all' ? ' in this division' : ''}.</p> : <>
                                <QuizzerCharts stats={selected} />
                                <StatGroup title='Scoring' items={[
                                    ['Total points', formatNumber(selected.points)], ['Points per quiz', formatNumber(selected.averagePoints)],
                                    ['Best quiz', formatNumber(selected.bestPoints)], ['Quiz-out bonuses', formatNumber(selected.quizOuts)]
                                ]} />
                                <StatGroup title='Answers' items={[
                                    ['Correct', formatNumber(selected.correct)], ['Errors', formatNumber(selected.errors)],
                                    ['Accuracy', formatPercent(selected.accuracy)], ['Fouls', formatNumber(selected.fouls)],
                                    ['Correct per quiz', formatNumber(selected.averageCorrect)], ['Errors per quiz', formatNumber(selected.averageErrors)],
                                    ['Most correct in a quiz', formatNumber(selected.bestCorrect)], ['Quizzes with 5+ errors', formatNumber(selected.errorOuts)]
                                ]} />
                                <StatGroup title='Interruptions' items={[
                                    ['Interruptions', formatNumber(selected.interruptions)], ['Correct', formatNumber(selected.interruptedCorrect)],
                                    ['Errors', formatNumber(selected.interruptedErrors)], ['Accuracy', formatPercent(selected.interruptionAccuracy)]
                                ]} />
                                <section className='quizzer-stats-history' aria-labelledby='quizzer-stats-history-title'>
                                    <h3 id='quizzer-stats-history-title'>Saved quiz history</h3>
                                    <div className='quizzer-stats-table-wrap'><table className='quizzer-stats-table'>
                                        <thead><tr><th scope='col'>Quiz</th><th scope='col'>Last saved</th><th scope='col'>Division</th><th scope='col'>Points</th><th scope='col'>Correct</th><th scope='col'>Errors</th></tr></thead>
                                        <tbody>{selected.history.map(result => <tr key={result.id}>
                                            <th scope='row'><Link to={`/viewquiz/${result.id}`}>{result.name}</Link></th><td>{formatDate(result.savedAt)}</td><td>{result.division || '-'}</td><td>{formatNumber(result.points)}</td><td>{result.correct}</td><td>{result.errors}</td>
                                        </tr>)}</tbody>
                                    </table></div>
                                </section>
                            </>}
                        </section>
                    </div>
                }
            </>}
        </main>
    )
}

export default QuizzerStats