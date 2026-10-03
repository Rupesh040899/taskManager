import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask, updateTask } from '../services/api.js';
import { Link } from 'react-router-dom';

export default function TaskList(){
  const [tasks,setTasks]=useState([]);
  const [filter,setFilter]=useState('all');
  const [loading,setLoading]=useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const params = filter==='all' ? {} : { status: filter };
      const res = await getTasks(params);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load tasks');
    } finally { setLoading(false); }
  };

  useEffect(()=>{ load(); },[filter]);

  const handleDelete=async(id)=>{
    if(!confirm('Delete this task?')) return;
    try{
      await deleteTask(id);
      setTasks(t=>t.filter(x=>x._id!==id));
    }catch(e){ alert('Delete failed'); }
  };

  const toggleStatus=async(task)=>{
    try{
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      const res = await updateTask(task._id, { ...task, status: newStatus });
      setTasks(t=>t.map(x=>x._id===task._id ? res.data : x));
    }catch(e){ alert('Update failed'); }
  };

  return (
    <div>
      <div style={{marginBottom:12}}>
        <label>Filter: </label>
        <select value={filter} onChange={e=>setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {loading ? <p>Loading...</p> : (
        tasks.length===0 ? <p>No tasks yet.</p> :
        tasks.map(task => (
          <div key={task._id} className="task">
            <div>
              <strong>{task.title}</strong> <small>({task.status})</small>
              <div style={{fontSize:13}}>{task.description}</div>
              <div style={{fontSize:11,color:'#666'}}>Created: {new Date(task.createdAt).toLocaleString()}</div>
            </div>
            <div>
              <button onClick={()=>toggleStatus(task)}>{task.status==='pending' ? 'Mark Completed' : 'Mark Pending'}</button>
              <Link to={`/edit/${task._id}`}>Edit</Link>
              <button onClick={()=>handleDelete(task._id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
