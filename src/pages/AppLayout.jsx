import styles from "./AppLayout.module.css";
import Sidebar from "../Components/Sidebar";
import Map from "../Components/Map";
import User from "../Components/User";
export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
