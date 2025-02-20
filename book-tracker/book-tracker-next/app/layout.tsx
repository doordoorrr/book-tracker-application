import '../styles/globals.css';  // Import global styles here

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>
        <h1>Book Tracker</h1>
        {/* Other global header content */}
      </header>
      <main>{children}</main>
      <footer>
        <p>© 2025 Book Tracker</p>
      </footer>
    </div>
  );
}
