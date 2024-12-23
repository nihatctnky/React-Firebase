import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { logout, auth, emailVerification } from './../firebase';
import { logout as logoutHandle } from "../store/Auth"
import UpdateProfile from "../components/UpdateProfile";



const Home = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.Auth)
    const handleLogout = async () => {
        await logout()
        dispatch(logoutHandle())
        navigate("/login", {
            replace: true
        })

    }

    const handleVerification = async () => {
        await emailVerification()
    }

    if (user) {
        return (
            <div className="max-w-2xl mx-auto py-5">
                <h1 className="flex gap-x-4 items-center whitespace-nowrap">
                    {auth.currentUser.photoURL && <img src={auth.currentUser.photoURL} className="w-9 h-9 rounded-full" />}
                    Oturum açık({user.email})
                    <button onClick={handleLogout} className="h-8 rounded px-4 text-sm text-white bg-indigo-700 whitespace-nowrap">Çıkış Yap</button>
                    {!user.emailVerified &&
                        <button onClick={handleVerification} className="h-8 rounded px-4 text-sm text-white whitespace-nowrap bg-indigo-700">E-posta Onayla</button>}
                </h1>

                <UpdateProfile />
            </div>
        )
    }
    return (
        <div>
            <Link to="/register">Kayıt Ol</Link>
            <Link to="/login">Giriş Yap</Link>
        </div>
    )
}

export default Home