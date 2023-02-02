import {TbNotes} from 'react-icons/tb'
import './NotesBar.css'

const NotesBar = (props) => {

    const handleNoteInput = (e) => {
        let input = e.target.value
        console.log(input)
        let notesTemp = props.notes.slice()
        notesTemp[props.question - 1].note = input
        console.log(notesTemp)
        props.setNotes(notesTemp)
    }

    return (
        <div className='notes-container'>
            <div className='notes-header'>
                <h1 className='notes-title'><TbNotes /> Notes</h1>
                <h1 className='notes-question'>Question {props.question}</h1>
            </div>
            <div>
                {props.notes.length > 0 && <textarea className='notes-text' value={props.notes[(props.question - 1)].note} onChange={e => handleNoteInput(e)} maxLength={1000} disabled={props.viewOnly ? true : false} />}
            </div>
        </div>
    )
}

export default NotesBar