"use client"
import styles from './styles/home.module.css'
import { use, useState } from 'react';
import { Macondo } from 'next/font/google'
import { useRouter } from 'next/navigation';
import { ToastContainer, toast,Bounce} from 'react-toastify';
const macondo = Macondo({
  subsets: ["latin"],
  weight: "400",
});
export default function Home() {
  const [tableNum, setTableNum] = useState("")

  const router = useRouter();
  const goToTablePage = () => {
    if (!tableNum.trim()) {
      toast.error('Invalid Table Number',{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    router.push(`/tabledata.js/${tableNum}`)
  }
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className={styles.nav}>
        <input type="text"
          value={tableNum}
          className={styles.input}
          placeholder='Enter Table Number...'
          onChange={(e) => {
            setTableNum(e.target.value)
            setshowError(false)

          }}
        />

        <button className={`${styles.button} ${macondo.className}`} onClick={goToTablePage}>New Order</button>
        <button className={`${styles.button} ${macondo.className}`}>View Orders</button>
      </div>
    </>
  );
}
