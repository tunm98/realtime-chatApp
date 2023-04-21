import Providers from "@/components/Providers";
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
      <head>
        <link
          rel="shortcut icon"
          href="https://livechat.design/images/livechat/DIGITAL%20%28RGB%29/PNG/Mark_RGB_Orange.png"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
