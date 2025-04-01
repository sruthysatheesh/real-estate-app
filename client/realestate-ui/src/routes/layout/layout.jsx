import "./layout.scss";
import Navbar from "../../components/navbar/Navbar";
import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export function Layout() {
    return (
        <div className="layout">
            <div className="navbar">
                <Navbar/>
            </div>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    );
}

export function RequireAuth() {
    const { currentUser } = useContext(AuthContext);
    return currentUser ? <Layout /> : <Navigate to="/login" replace />;
}