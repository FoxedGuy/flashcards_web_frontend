import { useAuth } from "../../context/AuthContext.jsx";
import "./Profile.css";
function Profile() {
    const { user } = useAuth();
    return (
        <div className="content-profile">
            <div className="white-box">
                <h2>Profil {user.username}</h2>
                <div className="profile-info">
                    <p><strong>Nazwa użytkownika:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;