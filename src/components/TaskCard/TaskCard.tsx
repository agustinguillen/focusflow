import './TaskCard.scss'
import { Trash } from 'lucide-react';

interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  onDragStart: (event: React.DragEvent<HTMLDivElement>, taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ id, title, description, onDragStart, onDelete }) => {
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    onDragStart(event, id);
  };
  const handleDeleteClick = () => {
    onDelete(id);
  };
  return (
    <div className="task" draggable={true} onDragStart={handleDragStart} id={id}>
      <div className='task-header'>
        <p className='task-title'>{title}</p>
        <button className="delete-button" onClick={handleDeleteClick}>
          <Trash />
        </button>
      </div>
      <p className='task-description'>{description}</p>
    </div>
  );
};

export default TaskCard;
