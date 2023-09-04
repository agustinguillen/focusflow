import React, { useState } from 'react';
import './ModalCreateTask.scss';

interface ModalCreateTaskProps {
  isOpen: boolean;
  onClose: () => void;
  columns: { id: string; title: string }[];
  onTaskCreate: (task: { title: string; description: string; columnId: string }) => void;
}

const ModalCreateTask: React.FC<ModalCreateTaskProps> = ({ isOpen, onClose, columns, onTaskCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedColumn, setSelectedColumn] = useState(columns[0]?.id);

  const handleCreateTask = () => {
    onTaskCreate({ title, description, columnId: selectedColumn });
    setTitle('');
    setDescription('');
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create a New Task</h2>
        <label htmlFor="taskTitle">Title</label>
        <input
          type="text"
          id="taskTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="taskDescription">Description</label>
        <textarea
          id="taskDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="columnSelect">Select a Column</label>
        <select
          id="columnSelect"
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
        >
          {columns.map((column) => (
            <option key={column.id} value={column.id}>
              {column.title}
            </option>
          ))}
        </select>
        <div className="modal-buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleCreateTask}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateTask;
