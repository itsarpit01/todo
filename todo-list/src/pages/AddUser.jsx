import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../schemas/userSchema";
import { addUser } from "../api/userApi";

export default function AddUser() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  async function onSubmit(formData) {
    setApiError("");

    try {
      await addUser(formData);
      reset();
      navigate("/users");
    } catch (err) {
      setApiError(err.message);
    }
  }

  return (
    <div className="todo-container">
      <h1>Add User</h1>

      <Link to="/users" className="edit-button">Back to Users</Link>

      {apiError && <p className="empty-text">{apiError}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        <div className="form-row">
          <div className="form-group">
            <label>First Name *</label>
            <input
              {...register("firstName")}
              placeholder="First name"
              className="task-input"
            />
            {errors.firstName && <p className="field-error">{errors.firstName.message}</p>}
          </div>

          <div className="form-group">
            <label>Last Name *</label>
            <input
              {...register("lastName")}
              placeholder="Last name"
              className="task-input"
            />
            {errors.lastName && <p className="field-error">{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            {...register("email")}
            placeholder="you@example.com"
            className="task-input"
          />
          <p className="field-hint">
            Please make sure your email ID is correct.
          </p>
          {errors.email && <p className="field-error">{errors.email.message}</p>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Gender *</label>
            <select {...register("gender")} className="task-input">
              <option value="">Choose</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender && <p className="field-error">{errors.gender.message}</p>}
          </div>

          <div className="form-group">
            <label>Age *</label>
            <input
              type="number"
              min="1"
              max="120"
              {...register("age")}
              placeholder="Age"
              className="task-input"
            />
            {errors.age && <p className="field-error">{errors.age.message}</p>}
          </div>
        </div>

        <div className="form-group">
          <label>Phone Number *</label>
          <input
            {...register("phone")}
            placeholder="Enter phone number"
            className="task-input"
          />
          {errors.phone && <p className="field-error">{errors.phone.message}</p>}
        </div>

        <div className="form-group">
          <label>Address *</label>
          <textarea
            {...register("address")}
            placeholder="Street, city, state"
            className="task-input address-input"
            rows="3"
          />
          {errors.address && <p className="field-error">{errors.address.message}</p>}
        </div>

        <button type="submit" className="add-button">
          Add User
        </button>
      </form>
    </div>
  );
}