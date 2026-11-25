import Spinner from 'react-bootstrap/Spinner'
import TeamEditModal from './TeamEditModal'
import {TbReportSearch} from 'react-icons/tb'
import './ToolBar.css'

const ToolBar = (props) => {
    const buzzersEnabled = props.buzzerStatus === 'connecting' || props.buzzerStatus === 'live'

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
                    <button className='toolbar-button' onClick={props.handleNewQuiz}>New Quiz</button>
                    <button className='toolbar-button' onClick={props.handleClearQuiz}>Reset Quiz</button>
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
                    <button
                        type='button'
                        className={`toolbar-button${buzzersEnabled ? ' toolbar-button-active' : ''}`}
                        onClick={buzzersEnabled ? props.stopBuzzer : props.enableBuzzer}
                        aria-pressed={buzzersEnabled}
                    >
                        {buzzersEnabled ? 'Disconnect phone buzzers' : 'Enable phone buzzers'}
                    </button>
                </div>
            }
        </div>
    )
}

export default ToolBar