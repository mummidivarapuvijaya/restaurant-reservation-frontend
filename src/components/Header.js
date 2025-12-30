 export default function Header() {
  return (
    <div style={styles.header}>
      <h1 style={styles.title}>
        Restaurant Reservation Management System
      </h1>
    </div>
  );
}

const styles = {
  header: {
    backgroundColor: "#7e889dff",
    padding: "15px 0",
    textAlign: "center"
  },
  title: {
    color: "white",
    margin: 0
  }
};
