import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@/components/Button";
import { useForm } from "react-hook-form";
import Input from "@/components/Input";
import AuthEnv from "@/components/AuthEnv";
import OTPVerification from "@/components/registration/otpverification";
import AuthTitle from "@/components/AuthTitle";
import authAPI from "@/api/user/auth";
import ShowHidePassword from "@/components/shared/ShowHidePassword";

const SignUp = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [role, setRole] = useState("client");
  const [password, setPassword] = useState("");
  const [showPasswordToggle, setShowPasswordToggle] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const location = useLocation();

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const showPassword = (e) => {
    e.preventDefault();
    setShowPasswordToggle(!showPasswordToggle);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get("role");
    if (roleParam) setRole(roleParam);
  }, [location.search]);

  const handleCheckboxChange = () => {
    setCheckboxChecked(!checkboxChecked);
  };

  // Utility: normalize Nigerian phone number
  const formatPhoneNumber = (number) => {
    let cleaned = number.replace(/\D/g, ""); // only digits

    if (number.startsWith("+234")) {
      return number; // already correct
    }

    if (cleaned.length === 11 && cleaned.startsWith("0")) {
      return `+234${cleaned.slice(1)}`; // 080... → +23480...
    }

    if (cleaned.length === 13 && cleaned.startsWith("234")) {
      return `+${cleaned}`; // 23480... → +23480...
    }

    return number; // fallback
  };

  const onSubmit = async (formData) => {
    setIsSubmitting(true);

    if (!checkboxChecked) {
      toast.error("Please agree to the terms and conditions");
      setIsSubmitting(false);
      return;
    }

    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setIsSubmitting(false);
      return;
    }

    try {
      const formattedPhone = formatPhoneNumber(formData.phoneNumber);

      const userData = {
        email: formData.email,
        name: formData.name,
        password,
        phone_number: formattedPhone,
        gender: formData.gender,
        role,
        type_of_service: "basic",
      };

      console.log("Sending user data:", userData);

      const result = await authAPI.authAPI.register(userData);
      console.log("Registration result:", result);

      if (result.success) {
        const response = result.data;

        if (response?.token) {
          // store under standardized key
          localStorage.setItem("accessToken", response.token);
        }

        if (response?.user) {
          localStorage.setItem("savedUser", JSON.stringify(response.user));
        }

        toast.success("Sign up successful!");
        setSubmittedEmail(formData.email);

        setTimeout(() => {
          setShowPopup(true);
        }, 2000);
      } else {
        const error = result.error;
        console.error("API ERROR DETAILS:", error);

        if (error.status === 500) {
          toast.error("Internal server error. Please try again.");
        } else if (error.status === 400) {
          // Handle bad request (user already exists, etc.)
          const errorMessage =
            error.originalError?.response?.data?.message ||
            error.originalError?.response?.data?.["error details"] ||
            error.message ||
            "Registration failed. Please check your details.";
          toast.error(errorMessage);
        } else {
          const errorMessage =
            error.originalError?.response?.data?.message ||
            error.originalError?.response?.data?.["error details"] ||
            error.message ||
            "Registration failed. Please try again.";
          toast.error(errorMessage);
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AuthEnv>
        <AuthTitle title="Sign Up" />
        <p className="text-primary text-sm pb-2">
          Register using your correct details
          {role && (
            <span className="ml-2 px-2 py-1 bg-primary text-white text-xs rounded">
              {role === "service_provider" ? "Service Provider" : "Customer"}
            </span>
          )}
        </p>

        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <Input
            control={control}
            name="name"
            label="Name"
            placeholder="Full name"
            validateType="min"
            minValue={2}
          />

          {/* Email */}
          <Input
            control={control}
            name="email"
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            validateType="email"
          />

          {/* Phone Number */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm mb-1">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              {...register("phoneNumber", {
                required: "Phone number is required",
                validate: (value) => {
                  const formatted = formatPhoneNumber(value);
                  if (!formatted.match(/^\+234[0-9]{10}$/)) {
                    return "Enter a valid Nigerian phone number";
                  }
                  return true;
                },
              })}
              type="text"
              inputMode="numeric"
              placeholder="Enter your Nigerian phone number"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all bg-transparent ${
                phoneFocused || phoneNumber
                  ? "border-primary ring-0.5 ring-primary"
                  : "border-gray-300"
              }`}
              onFocus={() => setPhoneFocused(true)}
              onBlur={() => setPhoneFocused(false)}
              onChange={(e) => {
                const value = e.target.value.trim();
                setPhoneNumber(value);
                setValue("phoneNumber", value);
              }}
              value={phoneNumber}
              required
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          {/* Gender */}
          <div className="mb-4">
            <label htmlFor="gender" className="block text-sm mb-1">
              Gender
            </label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="w-full bg-transparent border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              defaultValue=""
            >
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-xs mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2 mb-4">
            <label className="block text-sm mb-1">Password</label>
            <div className="relative">
              <input
                className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 placeholder-gray-400 bg-transparent focus:outline-none ${
                  passwordFocused || password
                    ? "border-primary ring-0.5 ring-primary"
                    : "border-gray-300"
                }`}
                type={showPasswordToggle ? "text" : "password"}
                name="password"
                placeholder="********"
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                onClick={showPassword}
              >
                <ShowHidePassword showPasswordToggle={showPasswordToggle} />
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start gap-2 mt-4 mb-4">
            <input
              type="checkbox"
              id="tc"
              checked={checkboxChecked}
              onChange={handleCheckboxChange}
              className="mt-1 w-4 h-4"
            />
            <label htmlFor="tc" className="text-sm text-primary leading-snug">
              Clicking the <strong>&quot;Continue&quot;</strong> button means I
              agree to the terms and conditions of <strong>FLAURY</strong>
            </label>
          </div>

          {/* Submit */}
          <Button
            title={isSubmitting ? "Loading..." : "Continue"}
            type="submit"
            customClasses="w-full px-4 py-3"
          />
        </form>

        <p className="text-primary text-sm mt-4 text-left">
          Already have an account?{" "}
          <Link to="/login" className="font-bold">
            Login
          </Link>
        </p>
      </AuthEnv>

      {/* OTP Modal */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <OTPVerification email={submittedEmail} />
        </div>
      )}
    </>
  );
};

export default SignUp;
