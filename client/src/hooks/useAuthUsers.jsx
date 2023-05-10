import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/usersSlice";

export default function useAuthUsers() {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated, loginWithRedirect, user, logout } =
    useAuth0();

  const { userDb } = useSelector(({ users }) => users);
  const { allUsers } = useSelector(({ users }) => users);
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      dispatch(addUser(user));
    }
  }, [dispatch, isAuthenticated, isLoading, user]);

  return {
    isLoading,
    isAuthenticated,
    loginWithRedirect,
    userDb,
    logout,
    allUsers,
  };
}
