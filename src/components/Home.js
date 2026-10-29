import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const headlineWords = ['easy', 'fun', 'simple', 'awesome', 'cool', 'fast', 'free']

const Home = () => {
    const [wordIndex, setWordIndex] = useState(0)
    const [typedWord, setTypedWord] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        const currentWord = headlineWords[wordIndex]
        const wordIsComplete = typedWord === currentWord
        const delay = isDeleting ? 70 : wordIsComplete ? 1100 : 140

        const timeoutId = setTimeout(() => {
            if (isDeleting) {
                if (typedWord.length === 0) {
                    setIsDeleting(false)
                    setWordIndex(index => (index + 1) % headlineWords.length)
                } else {
                    setTypedWord(typedWord.slice(0, -1))
                }
            } else if (wordIsComplete) {
                setIsDeleting(true)
            } else {
                setTypedWord(currentWord.slice(0, typedWord.length + 1))
            }
        }, delay)

        return () => clearTimeout(timeoutId)
    }, [isDeleting, typedWord, wordIndex])

    const handlePointerMove = event => {
        if (event.pointerType === 'touch') return

        const { currentTarget, clientX, clientY } = event
        const bounds = currentTarget.getBoundingClientRect()

        if (!bounds.width || !bounds.height) return

        const pointerX = ((clientX - bounds.left) / bounds.width) * 100
        const pointerY = ((clientY - bounds.top) / bounds.height) * 100

        currentTarget.style.setProperty('--pointer-x', `${pointerX}%`)
        currentTarget.style.setProperty('--pointer-y', `${pointerY}%`)
    }

    return (
        <div id='home-container'>
            <div className='full-page-banner' onPointerMove={handlePointerMove}>
                <div className='landing-grid' aria-hidden='true' />
                <div id='full-page-banner-text-container'>
                    <h1 id='full-page-banner-text-large' className='flip-horizontal-bottom'>
                        <span className='typewriter-prefix'>Scorebase is</span>
                        <span className='typewriter-word'>
                            {typedWord}
                            <span className='typewriter-cursor' aria-hidden='true' />
                        </span>
                    </h1>
                    <h1 id='full-page-banner-text-small'>Get started now with all the tools you need. It's easy!</h1>
                </div>
                <Link to='/scorekeeping' id='full-page-banner-button-container'><button className='primary-button' id='full-page-banner-button'>Get Started</button></Link>
            </div>
        </div>
    )
}

export default Home