import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner'
import TeamEditModal from './TeamEditModal'
import {TbReportSearch} from 'react-icons/tb'
import { toast } from 'react-toastify'
import './ToolBar.css'

const ToolBar = (props) => {

    const toastOptions = {
        position: 'bottom-right'
    }

    const handleJuniorSetting = () => {
        toast.success('Division set to Juniors', toastOptions)
        props.setDivision('Junior')
    }

    const handleSeniorSetting = () => {
        toast.success('Division set to Senior', toastOptions)
        props.setDivision('Senior')
    }

    return (
        <div>
            {props.viewOnly && 
                props.quizData.length != [] && 
                <div id='toolbar-div'>
                    <p className='toolbar-badge'><TbReportSearch /> View Only</p>
                    <p className='toolbar-data'>Division: {props.division}</p>
                    <p className='toolbar-data'>{new Date(props.quizData.saved.seconds * 1000).toLocaleDateString()}</p>
                    <p className='toolbar-data'>{new Date(props.quizData.saved.seconds * 1000).toLocaleTimeString('en-US')}</p>
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
                    <TeamEditModal redName={props.redName} setRedName={props.setRedName} yellowName={props.yellowName} setYellowName={props.setYellowName} red1Name={props.red1Name} setRed1Name={props.setRed1Name} red2Name={props.red2Name} setRed2Name={props.setRed2Name} red3Name={props.red3Name} setRed3Name={props.setRed3Name} red4Name={props.red4Name} setRed4Name={props.setRed4Name} red5Name={props.red5Name} setRed5Name={props.setRed5Name} yellow1Name={props.yellow1Name} setYellow1Name={props.setYellow1Name} yellow2Name={props.yellow2Name} setYellow2Name={props.setYellow2Name} yellow3Name={props.yellow3Name} setYellow3Name={props.setYellow3Name} yellow4Name={props.yellow4Name} setYellow4Name={props.setYellow4Name} yellow5Name={props.yellow5Name} setYellow5Name={props.setYellow5Name} red1Id={props.red1Id} setRed1Id={props.setRed1Id} red2Id={props.red2Id} setRed2Id={props.setRed2Id} red3Id={props.red3Id} setRed3Id={props.setRed3Id} red4Id={props.red4Id} setRed4Id={props.setRed4Id} red5Id={props.red5Id} setRed5Id={props.setRed5Id} yellow1Id={props.yellow1Id} setYellow1Id={props.setYellow1Id} yellow2Id={props.yellow2Id} setYellow2Id={props.setYellow2Id} yellow3Id={props.yellow3Id} setYellow3Id={props.setYellow3Id} yellow4Id={props.yellow4Id} setYellow4Id={props.setYellow4Id} yellow5Id={props.yellow5Id} setYellow5Id={props.setYellow5Id} />
                    <DropdownButton className='toolbar-button' bsPrefix='toolbar-button' title={`Division: ${props.division}`}>
                        <Dropdown.Item onClick={handleJuniorSetting}>Junior</Dropdown.Item>
                        <Dropdown.Item onClick={handleSeniorSetting}>Senior</Dropdown.Item>
                    </DropdownButton>
                </div>
            }
        </div>
    )
}

export default ToolBar