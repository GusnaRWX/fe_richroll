import "./global.css";
import "antd/dist/reset.css";

export const metadata = {
  title:
    "FREE Payroll Software | Best HR Payroll System In Singapore - Kayaroll",
  description:
    "It’s best to entrust your HR needs with Kayaroll! Our payroll software is an online leave management and payslip system designed for SMEs in Singapore. Free for the first 100 sign-ups!",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
