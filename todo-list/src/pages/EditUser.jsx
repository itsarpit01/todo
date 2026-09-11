import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../schemas/userSchema";
import { fetchUserById, updateUser } from "../api/userApi";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      try {
        const user = await fetchUserById(id);

        reset({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          age: user.age,
          gender: user.gender === "female" ? "female" : "male",
          address: user.address?.address ?? "",
        });
      } catch (err) {
        setApiError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [id, reset]);

  async function onSubmit(formData) {
    setApiError("");

    try {
      await updateUser(id, formData);
      reset();
      navigate("/users");
    } catch (err) {
      setApiError(err.message);
    }
  }

  if (loading) {
    return <p className="empty-text">Loading user...</p>;
  }

  return (
    <div className="todo-container">
      <h1>Edit User</h1>

      <Link to="/users" className="edit-button">Back to Users</Link>

      {apiError && <p className="empty-text">{apiError}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        <div className="form-group">
          <label>Email *</label>
          <input
            {...register("email")}
            placeholder="you@example.com"
            className="task-input"
          />
          {errors.email && <p className="field-error">{errors.email.message}</p>}
        </div>

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
          <input
            {...register("address")}
            placeholder="Street, city, state"
            className="task-input"
          />
          {errors.address && <p className="field-error">{errors.address.message}</p>}
        </div>

        <button type="submit" className="add-button">
          Save Changes
        </button>
      </form>
    </div>
  );
}