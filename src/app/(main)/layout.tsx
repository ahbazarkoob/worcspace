import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <AppSidebar />
            <SidebarInset className=" bg-white shadow-none m-0">
                {children}
            </SidebarInset>
        </>
    );
};

export default DashboardLayout