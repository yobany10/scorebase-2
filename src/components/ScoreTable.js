import React from 'react'
import Table from 'react-bootstrap/Table'

import './ScoreTable.css'

const ScoreTable = props => {

    return (
      <div className='scoretable-div'>
        <Table striped hover className='scoretable'>
          <thead>
            <tr>
              <th>Question</th>
              <th>R1</th>
              <th>R2</th>
              <th>R3</th>
              <th>R4</th>
              <th>R5</th>
              <th>R Score</th>
              <th>Y Score</th>
              <th>Y1</th>
              <th>Y2</th>
              <th>Y3</th>
              <th>Y4</th>
              <th>Y5</th>
            </tr>
          </thead>
          <tbody>
            {props.render}
          </tbody>
        </Table>
        </div>
    )
}

export default ScoreTable