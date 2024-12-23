import { useState } from 'react';
import { update, auth } from "../firebase"; // firebase'den update fonksiyonunu import ediyoruz
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/Auth'; // Redux store'a login işlemi için import

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    const user = authState ? authState.user : null;  // user objesini güvenli bir şekilde alıyoruz

    const [displayName, setDisplayName] = useState(user ? user.displayName : "");
    const [avatar, setAvatar] = useState(user?.photoURL || "");
    const [password, setPassword] = useState("");

    // Profil güncelleme işlemi
    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await update(displayName, avatar);

        if (success) {
            dispatch(login({
                displayName: auth.currentUser.displayName,
                email: auth.currentUser.email,
                emailVerified: auth.currentUser.emailVerified,
                photoURL: auth.currentUser.photoURL,
                uid: auth.currentUser.uid
            }));
        }
    };

    // Parola güncelleme işlemi
    const handleResetSubmit = async (e) => {
        e.preventDefault();
        // resetPassword işlemini buraya ekleyeceksiniz
        setPassword(""); // Şifreyi sıfırlama işlemi sonrası boşaltma
    };

    return (
        <div>
            {/* Profil Güncelleme Formu */}
            <form onSubmit={handleSubmit} className='grid gap-y-4'>
                <h1 className='text-xl font-bold mb-4'>Profili Güncelle</h1>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Ad-soyad
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="John doe"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Fotoğraf
                    </label>
                    <div className="mt-1">
                        <input
                            type="text"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Fotoğraf URL'sini girin"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 disabled:opacity-30 border border-blue-700 rounded"
                        type="submit"
                    >
                        Güncelle
                    </button>
                </div>
            </form>

            {/* Parola Güncelleme Formu */}
            <form onSubmit={handleResetSubmit} className='grid gap-y-4'>
                <h1 className='text-xl font-bold mb-4'>Parola Güncelle</h1>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Parola
                    </label>
                    <div className="mt-1">
                        <input
                            type="password"
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            placeholder="Değiştirmek istemiyorsanız değiştirmeyin.."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 disabled:opacity-30 border border-blue-700 rounded"
                        type="submit"
                    >
                        Şifreyi Güncelle
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;
