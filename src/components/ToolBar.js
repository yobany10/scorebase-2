import Spinner from 'react-bootstrap/Spinner'
import TeamEditModal from './TeamEditModal'
import {TbReportSearch} from 'react-icons/tb'
import './ToolBar.css'

const ToolBar = (props) => {
    return (
        <div>
            {props.viewOnly &&
                props.quizData?.savedAt &&
                <div id='toolbar-div'>
                    <p className='toolbar-badge'><TbReportSearch /> View Only</p>
                    <p className='toolbar-data'>Division: {props.division}</p>
                    <p className='toolbar-data'>{new Date(props.quizData.savedAt).toLocaleDateString()}</p>
                    <p className='toolbar-data'>{new Date(props.quizData.savedAt).toLocaleTimeString('en-US')}</p>
                </div>
            }
            {!props.viewOnly && 
                <div id='toolbar-div'>
                    <button className='toolbar-button' onClick={props.handleResetQuiz}>Reset Quiz</button>
                    {props.isSaving ?
                        <button className='toolbar-button' disabled>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              variant='success'
                              role="status"
                              aria-hidden="true"
                            />
                        </button>
                        :
                        <button className='toolbar-button' onClick={props.handleSaveQuiz}>Save Quiz</button>
                    }
                    <TeamEditModal {...props} />
                </div>
            }
        </div>
    )
}

export default ToolBar