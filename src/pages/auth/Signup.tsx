import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { signupFn } from "../../redux/authReducer/action";

const Signup = () => {
    // State to manage form inputs
    const [formData, setFormData] = useState<any>({
        fullName: "",
        email: "",
        password: "",
        username: "",
        profilePic: "",
        status: "",
    });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Redux state for loading and error
    const { isLoadingSignup, isErrorSignup } = useAppSelector((state) => state.auth);

    // State to manage form errors
    const [errors, setErrors] = useState<any>({
        fullName: "",
        email: "",
        password: "",
        username: "",
        profilePic: "",
        status: "",
    });

    // Handle input change
    const handleInputChange = (e: any) => {
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
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // Validate form inputs
        let isValid = true;
        const newErrors: any = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full Name is required";
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

        if (!formData.username.trim()) {
            newErrors.username = "Username is required";
            isValid = false;
        }

        if (!formData.profilePic.trim()) {
            newErrors.profilePic = "Profile picture URL is required";
            isValid = false;
        }

        if (!formData.status.trim()) {
            newErrors.status = "Status is required";
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        // If form is valid, proceed with signup logic
        try {
            const result = await dispatch(signupFn(formData as any)) as any; // Dispatch signup action

            // Check if the signup was successful
            if (result?.payload?.success) {
                navigate("/login"); // Redirect to login page only if signup is successful
            } else {
                // Handle API error (e.g., display error message)
                console.error("Signup failed:", result?.payload?.message);
            }
        } catch (error) {
            console.error("An unexpected error occurred:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                {isErrorSignup && (
                    <div className="mb-4 p-2 bg-red-100 text-red-600 text-sm rounded-md text-center">
                        Signup failed. Please try again.
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    {Object.keys(formData).map((key: any) => (
                        <div key={key} className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </label>
                            <input
                                type={key === "password" ? "password" : "text"}
                                name={key}
                                value={formData[key]}
                                onChange={handleInputChange}
                                className={`mt-1 p-2 w-full border rounded-md ${errors[key] ? "border-red-500" : "border-gray-300"}`}
                                placeholder={`Enter your ${key}`}
                            />
                            {errors[key] && (
                                <p className="text-red-500 text-sm mt-1">{errors[key]}</p>
                            )}
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={isLoadingSignup}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                        {isLoadingSignup ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    Already have an account?{" "}
                    <Link className="text-blue-500 hover:underline" to="/login">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;