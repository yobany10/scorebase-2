import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown';
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
                    <p className='toolbar-data'>{new Date(props.quizData.saved.seconds * 1000).toLocaleDateString()}</p>
                    <p className='toolbar-data'>{new Date(props.quizData.saved.seconds * 1000).toLocaleTimeString('en-US')}</p>
                </div>
            }
            {!props.viewOnly && 
                <div id='toolbar-div'>
                    <button className='toolbar-button' onClick={props.handleResetQuiz}>Reset Quiz</button>
                    <DropdownButton className='toolbar-button' bsPrefix='toolbar-button' title="Division">
                        <Dropdown.Item onClick={handleJuniorSetting}>Junior</Dropdown.Item>
                        <Dropdown.Item onClick={handleSeniorSetting}>Senior</Dropdown.Item>
                    </DropdownButton>
                    <button className='toolbar-button' onClick={props.handleSaveQuiz}>Save Quiz</button>
                </div>
            }
        </div>
    )
}

export default ToolBar