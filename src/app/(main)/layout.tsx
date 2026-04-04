import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <AppSidebar />
            <SidebarInset className="">
                {children}
            </SidebarInset>
        </>
    );
};

export default DashboardLayout