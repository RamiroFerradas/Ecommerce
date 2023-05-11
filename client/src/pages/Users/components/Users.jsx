import React, { useState } from "react";
import useAuthUsers from "../../../hooks/useAuthUsers";
import { FiDelete, FiEdit } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { deleteUser, updateUser } from "../../../redux/usersSlice";
import FormUsers from "./FormUsers";
import Spinner from "../../../components/Spinner";

export default function Users() {
  const dispatch = useDispatch();
  const { allUsers, loading } = useAuthUsers();

  const [viewFormUser, setViewFormUser] = useState(false);

  const handleClose = () => {
    setViewFormUser(false);
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {allUsers.map((user) => (
          <li key={user.id}>
            <a href="#" className="block hover:bg-gray-50">
              <div className="flex items-center px- py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      src={user.picture}
                      alt={user.name}
                    />
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div className="flex flex-col items-cente">
                      <div className="text-lg font-medium text-indigo-600 truncate">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                    <p className="mt-2 flex items-center text-lg text-gray-600">
                      <span className="truncate">
                        {user.role[0].toUpperCase() + user.role.slice(1)}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-1">
                    <button
                      onClick={() => setViewFormUser(true)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full mr- "
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => dispatch(deleteUser(user.id))}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                    >
                      <FiDelete />
                    </button>
                  </div>
                </div>
              </div>
            </a>
            {viewFormUser ? (
              <FormUsers user={user} handleClose={handleClose} />
            ) : (
              false
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
