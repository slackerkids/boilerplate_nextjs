import "@/styles/globals.css";

export const metadata = {
  title: "Project",
  description: "Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
