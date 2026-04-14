import "./globals.css";

export const metadata = {
  title: "Quiz Game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="bg-gradient-to-r from-purple-500 to-indigo-600 min-h-screen flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}