import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown';
import { toast } from 'react-toastify'
import './ToolBar.css'

const ToolBar = (props) => {

    const toastOptions = {
        position: 'bottom-left'
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
        <div id='toolbar-div'>
            <button className='toolbar-button' onClick={props.handleResetQuiz}>Reset Quiz</button>
            <DropdownButton className='toolbar-button' bsPrefix='toolbar-button' title="Division">
                <Dropdown.Item onClick={handleJuniorSetting}>Junior</Dropdown.Item>
                <Dropdown.Item onClick={handleSeniorSetting}>Senior</Dropdown.Item>
            </DropdownButton>
        </div>
    )
}

export default ToolBar