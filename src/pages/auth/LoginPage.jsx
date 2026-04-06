import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthentication";
import { RiAccountCircleFill } from "../../assets/icons/reactIcons";
import { Button, Dropdown, Input } from "../../components";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const demoUsers = [
    {
      label: "Arjun (Demo)",
      email: "arjun@demo.com",
      password: "demo123",
    },
    {
      label: "Priya (Demo)",
      email: "priya@demo.com",
      password: "demo123",
    },
    {
      label: "Rahul (Demo)",
      email: "rahul@demo.com",
      password: "demo123",
    },

  ];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSelectUser = (user) => {
    setFormData({
      email: user.email,
      password: user.password,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await login(formData);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const dropdownItems = demoUsers.map((user) => ({
    label: user.label,
    onClick: () => handleSelectUser(user),
  }));

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-secondary rounded-2xl p-6 sm:p-8 shadow-lg">

        
        <div className="mb-6 flex justify-center">
          <div className="w-12 h-12 rounded-full flex justify-center items-center bg-primary">
            <RiAccountCircleFill size={40} className="text-text-primary" />
          </div>
        </div>

        
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">
            Welcome Back
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Select a demo user or login manually
          </p>
        </div>

       
        <div className="mb-4">
          <Dropdown
            trigger={
              <Button className="w-full bg-text-secondary text-primary">
                Select Demo User
              </Button>
            }
            items={dropdownItems}
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          
          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />

          
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />

          
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-medium disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;