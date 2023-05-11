import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/usersSlice";

export default function useAuthUsers() {
  const dispatch = useDispatch();
  const { isLoading, isAuthenticated, loginWithRedirect, user, logout } =
    useAuth0();

  var { userDb, allUsers, loading } = useSelector(({ users }) => users);

  loading = loading || isLoading;

  useEffect(() => {
    const existUser = allUsers.some((us) => us.email === user.email);

    if (!isLoading && isAuthenticated && !existUser) {
      dispatch(addUser(user));
    }
  }, [allUsers, dispatch, isAuthenticated, isLoading, user]);

  return {
    loading,
    isAuthenticated,
    loginWithRedirect,
    userDb,
    logout,
    allUsers,
  };
}
