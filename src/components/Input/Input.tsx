
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import './Input.css'
import {TiDelete} from 'react-icons/ti'

type InputProps = {
    index: number,
    id: number,
    name: string,
    checkNames: (newName: string) => void,
    deletePlayer: (id: number) => void,
}



const Input = (props: InputProps) => {
  const {index, id, name, checkNames, deletePlayer} = props

  const [text, setText] = useState(name)


  const onInputChange = (event:ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value)
    checkNames(event.currentTarget.value)
  }

  return (
      <>
        <div className="player-input__wrap">
            <input
              type="text"
              name="name"
              value={text}
              className="player-input"
              onChange={onInputChange}
              id="nme"
              required
              autoComplete="off"
            />
            <label><span>{`Player #${index+1}`}</span></label>
            <TiDelete  className='player-input__delete' onClick={() => deletePlayer(id)}/>
        </div>
      </>
  )
}

export default Input