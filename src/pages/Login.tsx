import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginFn } from "../redux/authReducer/action";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Loader } from "lucide-react";

const Login = () => {
    // State to manage form inputs
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { isAuth, token, isLoadingLogin } = useAppSelector((state) => state.auth);

    // State to manage form errors

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    // Add useEffect to handle redirect after successful login
    useEffect(() => {
        if (isAuth && token) {
            navigate("/chat");
        }
    }, [isAuth, token, navigate]);

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear errors when user starts typing
        setErrors({
            ...errors,
            [name]: "",
        });
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form inputs
        let isValid = true;
        const newErrors = { email: "", password: "" };

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
            isValid = false;
        }

        if (!formData.password.trim()) {
            newErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 3) {
            newErrors.password = "Password must be at least 3 characters";
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        dispatch(loginFn(formData) as any);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`mt-1 p-2 w-full border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`mt-1 p-2 w-full border rounded-md ${errors.password ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        {isLoadingLogin && <Loader className="animation-spin" />}
                        Login
                    </button>

                    {/* Link to Signup Page */}
                    <p className="mt-4 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-500 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;