import { useEffect, useState } from "react";
import {FaTrash} from "react-icons/fa";
import './Groups-Dashboard.css';
import {Link} from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

function GroupsDashboard(){
    const [groups, setGroups] = useState([]);
    const [error, setError] = useState(null);
    const {user} = useAuth();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await fetch('http://localhost:8000/groups/user', {
                    method: 'GET',
                    credentials: "include"
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setGroups(data);
            } catch (error) {
                setError(error);
            }
        };

        fetchGroups();
    }, []);

    const handleDeleteGroup = async (groupId) => {
        try {
            const response = await fetch(`http://localhost:8000/groups/${groupId}`, {
                method: 'DELETE',
                credentials: "include"
            });
            if (!response.ok){
                throw new Error('Network response was not ok');
            }
            setGroups(groups.filter(group => group.group_id !== groupId));
        }catch(error){
            setError(error);
        }
    }

    const Modal = () => {
        const [show, setShow] = useState(false);
        const [groupName, setGroupName] = useState('');
        const [error, setError] = useState(null);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setError(null);
            try {
                const response = await fetch('http://localhost:8000/groups/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    body: JSON.stringify({ group_name: groupName, user_id: user.user_id}),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setGroups([...groups, data]);
                setShow(false);
            } catch (error) {
                setError(error);
            }

        };
        return (
            <>
                {show ? (
                    <div className="modal-overlay">
                        <div className="modal-box">
                            <span className="modal-close" onClick={() => setShow(false)}>&times;</span>
                            <h2>Podaj nazwę grupy</h2>
                            {error && <div className="error-message">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    required
                                />
                                <button className="modal-button" type="submit">Utwórz</button>
                            </form>
                        </div>
                    </div> ) : ( <></>)
                }
                <button className="group-new-button" onClick={() => setShow(true)}>Utwórz grupę</button>
            </>
        );
    }

    return (
        <div className="content-flashcard-dashboard">
            <div className="white-box">
                <div className="groups-header">
                    <h2>Twoje grupy</h2>
                    <Modal></Modal>
                </div>
                {error ? (
                    <p>{error}</p>
                ) : groups.length === 0 ? (
                    <>
                        <p>Nie masz jeszcze żadnych grup fiszek. Stwórz nową grupę, by zacząć naukę!</p>
                    </>
                ):(
                    <>
                        <div className="groups-box">
                            <div className='groups-container'>
                                {groups.map((group, index) => (
                                    <div key = {index} className="group">
                                        <FaTrash className='trash-icon' title="Usuń grupę" onClick={() => handleDeleteGroup(group.group_id)} />
                                        <Link to={`/groups/${group.group_name}`}>
                                            <h3>{group.group_name}</h3>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default GroupsDashboard;