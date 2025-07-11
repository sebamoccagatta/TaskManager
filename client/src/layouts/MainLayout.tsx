import { Outlet } from "react-router";
import Nav from "../components/Nav";

export default function MainLayout() {
    return (
        <div>
            <Nav />
            <main className="container mx-auto p-4">
                <Outlet />
            </main>
        </div>
    );
}

