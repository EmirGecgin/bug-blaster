import { type } from '@testing-library/user-event/dist/type';
import React, { useEffect, useState } from 'react'

function TicketForm({dispatch, editingTicket}) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('1');

    useEffect(()=>{
        if(editingTicket){
            setTitle(editingTicket.title)
            setDescription(editingTicket.description)
            setPriority(editingTicket.priority)
        }
        else{
            cleanForm();
        }
    },[editingTicket])

    const priorityLabels = {
        1: 'Low',
        2: 'Medium',
        3: 'High'
    };

    const cleanForm = () => {
        setTitle('');
        setDescription('');
        setPriority('1');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const ticketData = {
            id: editingTicket ? editingTicket.id :  new Date().toISOString(),
            title,
            description,
            priority
        };
        dispatch({
            type:editingTicket ? "UPDATE_TICKET" : "ADD_TICKET",
            payload: ticketData
        })
        console.log('Submitted Ticket:', ticketData);
        cleanForm();
    }
    const handleCancelEdit = ()=>{
        cleanForm();
        dispatch({type:"CLEAR_EDITING_TICKET"});
    }

  return (
    <form className='ticket-form' onSubmit={handleSubmit}>
      <h2>Create a New Ticket</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          className='form-input'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          className='form-input'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <fieldset className='priority-fieldset'>
        <legend>Priority:</legend>
        {Object.entries(priorityLabels).map(([value, label]) => (
          <div key={value}>
            <input
              type="radio"
              className='priority-input'
              id={`priority-${value}`}
              name="priority"
              value={value}
              checked={priority === value}
              onChange={(e) => setPriority(e.target.value)}
            />
            <label className='priority-label' htmlFor={`priority-${value}`}>{label}</label>
          </div>
        ))}
      </fieldset>
      <button className='button' type="submit">Submit</button>
      {editingTicket && (
        <button className='button' onClick={handleCancelEdit}>Cancel Edit</button>
      )}
    </form>
  )
}

export default TicketForm