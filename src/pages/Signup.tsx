import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
    // State to manage form inputs
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    // State to manage form errors
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
    });

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
        const newErrors = { name: "", email: "", password: "" };

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        }

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
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        // If form is valid, proceed with signup logic
        console.log("Form submitted:", formData);
        // Add your signup logic here (e.g., API call)
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`mt-1 p-2 w-full border rounded-md ${errors.name ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Enter your name"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>

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
                        Sign Up
                    </button>
                </form>
                <div className="mt-4 text-center">
                    Al Ready Have a Account? <Link className="text-blue-500 hover:underline" to={"/login"}>Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;