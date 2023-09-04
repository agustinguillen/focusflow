import Task from '../TaskCard/TaskCard';
import './Column.scss'

interface ColumnProps {
  id: string;
  title: string;
  tasks: { id: string; title: string; description: string }[];
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>, columnId: string) => void;
  onTaskDragStart: (event: React.DragEvent<HTMLDivElement>, taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const Column: React.FC<ColumnProps> = ({ id, title, tasks, onDragOver, onDrop, onTaskDragStart, onDelete }) => {
  return (
    <div className="column" onDragOver={onDragOver} onDrop={(event) => onDrop(event, id)}>
      <h3 className='column-title'>{title}</h3>
      {tasks.map((task) => (
        <Task 
          key={task.id} 
          id={task.id} 
          title={task.title} 
          description={task.description} 
          onDragStart={onTaskDragStart} 
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default Column;
