import './Sidebar.scss'
import { useState, Dispatch, SetStateAction } from 'react'
import { KanbanSquare, ClipboardCheck } from 'lucide-react'
import LogoImage from '../../assets/images/logo.png'

interface SidebarProps {
    setShowModal: Dispatch<SetStateAction<boolean>>
}

const Sidebar: React.FC<SidebarProps> = ({ setShowModal }) => {
    const [selected, setSelected] = useState<string>('kanban')
    const menuItems = [
        {
            id: 'kanban',
            name: 'Kanban',
            icon: <KanbanSquare />,
            function: () => null,
        },
        {
            id: 'create-task',
            name: 'Create Task',
            icon: <ClipboardCheck />,
            function: setShowModal,
        }
    ]
    return (
        <div className="sidebar">
            <div className='sidebar-logo-container'>
                <img className='sidebar-logo' src={LogoImage} alt='FocusFlow icon' height={50} width={50} />
                <h1 className='sidebar-branch'>Focus <span className='sidebar-branch-flow'>Flow</span></h1>
            </div>
            {
                menuItems.map(item => (
                    <button
                        key={item.id}
                        onClick={(): void => {
                            setSelected(item.id)
                            item.id === 'create-task' && item.function(true)
                        }}
                        className={`sidebar-button ${selected === item.id ? 'sidebar-button-selected' : ''}`}
                    >
                        {item.icon}
                        <p style={{ marginLeft: '5px' }}>{item.name}</p>

                    </button>
                ))
            }
        </div>
    )
}

export default Sidebar