

import React, { useState } from "react";

import { login } from './../firebase';
import { useDispatch } from "react-redux";
import { login as loginHandle } from "../store/Auth";
import { useNavigate } from "react-router-dom";

// Register fonksiyonu - Kayıt işlemini yapan fonksiyon (örnek)
const Login = async (email, password) => {
    // Burada kullanıcıyı kaydetme işlemini gerçekleştirebilirsiniz.
    // Örneğin, bir API çağrısı yapılabilir.
    return { email, password }; // Örnek bir dönüş
};

const LoginForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Register fonksiyonu ile kullanıcı kaydedilir
        const user = await login(email, password);

        if (user) {
            dispatch(loginHandle(user))
            navigate("/", {
                replace: true
            });
        }
    };

    return (

        <form className="max-w-xl mx-auto grid gap-y-4 py-4" onSubmit={handleSubmit}>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    E-posta
                </label >
                <div className="mt-1">
                    <input type="email"

                        className="shadow-sm focu:ring-indigo-500 focus:border-indigo-500block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="you@example.com"
                        value={email} onChange={(e) => setEmail(e.target.value)}>

                    </input>
                </div>
            </div>









            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Parola
                </label >
                <div className="mt-1">
                    <input type="password"

                        className="shadow-sm focu:ring-indigo-500 focus:border-indigo-500block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="*****"
                        value={password} onChange={(e) => setPassword(e.target.value)}>

                    </input>
                </div>
            </div>


            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 disabled:opacity-30 border border-blue-700 rounded" disabled={!email || !password} type="submit">
                    Giriş Yap
                </button>
            </div>
        </form>

    );
};

export default LoginForm;
