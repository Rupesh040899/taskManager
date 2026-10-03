import React, { useEffect, useState } from 'react';
import { getTask, updateTask } from '../services/api.js';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditTask(){
  const { id } = useParams();
  const [task,setTask]=useState(null);
  const [loading,setLoading]=useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    (async()=>{
      try{
        const res = await getTask(id);
        setTask(res.data);
      }catch(err){ alert('Could not load task'); }
      finally{ setLoading(false); }
    })();
  },[id]);

  const submit = async (e) => {
    e.preventDefault();
    if(!task.title || task.title.trim()===''){ return alert('Title is required'); }
    try{
      await updateTask(id, task);
      navigate('/');
    }catch(err){ alert('Update failed'); }
  };

  if(loading) return <p>Loading...</p>;
  if(!task) return <p>Task not found</p>;

  return (
    <form onSubmit={submit}>
      <div className="form-row">
        <label>Title *</label>
        <input value={task.title} onChange={e=>setTask({...task, title: e.target.value})} />
      </div>
      <div className="form-row">
        <label>Description</label>
        <textarea value={task.description} onChange={e=>setTask({...task, description: e.target.value})} rows="4" />
      </div>
      <div className="form-row">
        <label>Status</label>
        <select value={task.status} onChange={e=>setTask({...task, status: e.target.value})}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit">Update Task</button>
    </form>
  );
}
