import React, { useState } from 'react';
import { createTask } from '../services/api.js';
import { useNavigate } from 'react-router-dom';

export default function AddTask(){
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [status,setStatus]=useState('pending');
  const [saving,setSaving]=useState(false);
  const navigate = useNavigate();

  const submit=async(e)=>{
    e.preventDefault();
    if(title.trim()===''){ return alert('Title is required'); }
    setSaving(true);
    try{
      await createTask({ title: title.trim(), description, status });
      navigate('/');
    }catch(err){ alert('Create failed'); }
    finally{ setSaving(false); }
  };

  return (
    <form onSubmit={submit}>
      <div className="form-row">
        <label>Title *</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Description</label>
        <textarea value={description} onChange={e=>setDescription(e.target.value)} rows="4" />
      </div>
      <div className="form-row">
        <label>Status</label>
        <select value={status} onChange={e=>setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Add Task'}</button>
    </form>
  );
}
