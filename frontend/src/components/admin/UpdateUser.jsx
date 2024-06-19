import React, { useState, useEffect } from 'react';
import AdminLayout from '../layout/AdminLayout';
import MetaData from '../layout/MetaData';
import { toast } from 'react-hot-toast';
import Loader from '../layout/Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../redux/api/userApi';

const UpdateUser = () => {
  const params = useParams();
  const { data } = useGetUserDetailsQuery(params?.id);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const navigate = useNavigate();

  const [updateUser, { error, isSuccess, isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (data?.user) {
      setName(data?.user?.name);
      setEmail(data?.user?.email);
      setRole(data?.user?.role);
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success('User Upadated');
    }
  }, [data, error, isSuccess]);

  const submitHandler = (id) => {
    const userData = { name, email, role };
    updateUser({ id, body: userData });
    navigate('/admin/users');
  };

  return (
    <AdminLayout>
      <MetaData title={'Update User'} />
      <div className="row wrapper">
        <div className="col-10 col-lg-8">
          <form
            className="shadow-lg"
            onSubmit={() => submitHandler(data?.user?._id)}
          >
            <h2 className="mb-4">Update User</h2>

            <div className="mb-3">
              <label htmlFor="name_field" className="form-label">
                Name
              </label>
              <input
                type="name"
                id="name_field"
                className="form-control"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email_field" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="role_field" className="form-label">
                Role
              </label>
              <select
                id="role_field"
                className="form-select"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">user</option>
                <option value="admin">admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn update-btn w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update'}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateUser;
