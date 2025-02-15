import AdUpdate from "@/components/AdUpdate";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata:any = {
  title: "Next.js Settings | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Settings page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Settings = () => {
  return (
    <DefaultLayout>
     <AdUpdate />
    </DefaultLayout>
  );
};

export default Settings;
