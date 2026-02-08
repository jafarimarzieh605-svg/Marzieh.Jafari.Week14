function Layout({ children }) {
  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#4a90e2" }}>Contact App</h1>
      {children}
    </div>
  );
}
export default Layout;
