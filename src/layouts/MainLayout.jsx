import Header from "./HeaderLayout";
import Footer from "./FooterLayout";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                   <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}