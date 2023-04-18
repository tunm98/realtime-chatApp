import "./globals.css";

export const metadata = {
  title: "Realtime App",
  description: "Realtime App",
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
