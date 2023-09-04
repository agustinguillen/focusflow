import React, { useState } from 'react';
import Column from './components/Column/Column';
import './App.scss'
import Sidebar from './components/Sidebar/Sidebar';
import { ColumnInterface } from './types/column-items';
import ModalCreateTask from './components/ModalCreateTask/ModalCreateTask';
import { generateUniqueId } from './utils/unique-id';

const columnsItems: ColumnInterface[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      { id: 'example', title: 'Example Task', description: 'Example Task 1 description' },
      { id: 'example-2', title: 'Example Task 2', description: 'Example Task 2 description' },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    tasks: [],
  },
  {
    id: 'completed',
    title: 'Completed',
    tasks: [],
  },
]

const App: React.FC = () => {
  const [columns, setColumns] = useState<ColumnInterface[]>(columnsItems);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleTaskDragStart = (event: React.DragEvent<HTMLDivElement>, taskId: string) => {
    event.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, columnId: string) => {
    event.preventDefault();
    const taskId = event.dataTransfer.getData('taskId');
  
    const updatedColumns = [...columns];
    const sourceColumnIndex = updatedColumns.findIndex((column) =>
      column.tasks.some((task) => task.id === taskId)
    );
    const targetColumnIndex = updatedColumns.findIndex((column) => column.id === columnId);
  
    if (sourceColumnIndex !== -1 && targetColumnIndex !== -1) {
      const sourceColumn = updatedColumns[sourceColumnIndex];
      const updatedSourceTasks = sourceColumn.tasks.filter((task) => task.id !== taskId);
      updatedColumns[sourceColumnIndex] = { ...sourceColumn, tasks: updatedSourceTasks };
      const taskToMove = sourceColumn.tasks.find((task) => task.id === taskId);
  
      if (taskToMove) {
        const targetColumn = updatedColumns[targetColumnIndex];
        updatedColumns[targetColumnIndex] = {
          ...targetColumn,
          tasks: [...targetColumn.tasks, taskToMove],
        };
        setColumns(updatedColumns);
      }
    }
  }; 

  const createTask = (task: { title: string, description: string, columnId: string }) => {
    const updatedColumns = [...columns];
    const columnIndex = updatedColumns.findIndex(column => column.id === task.columnId);
  
    if (columnIndex !== -1) {
      const newTask = {
        id: generateUniqueId(),
        title: task.title,
        description: task.description,
      };

      updatedColumns[columnIndex].tasks.push(newTask);
      setColumns(updatedColumns);
      setShowModal(false);
    }
  };

  const deleteTask = (taskId: string) => {
    const updatedColumns = columns.map((column) => ({
      ...column,
      tasks: column.tasks.filter((task) => task.id !== taskId),
    }));
  
    setColumns(updatedColumns);
  };

  return (
    <div className="app">
      {showModal && 
        <ModalCreateTask 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
          columns={columnsItems}
          onTaskCreate={createTask}
        />}
      <div className='app-container'>
        <Sidebar setShowModal={setShowModal} />
        <div className="kanban">
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={column.tasks}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onTaskDragStart={handleTaskDragStart}
              onDelete={deleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
