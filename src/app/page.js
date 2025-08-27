"use client"
import styles from './styles/home.module.css'
import { use, useState } from 'react';
import { Macondo } from 'next/font/google'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { ToastContainer, toast,Bounce} from 'react-toastify';
const macondo = Macondo({
  subsets: ["latin"],
  weight: "400",
});
export default function Home() {
  const [tableNum, setTableNum] = useState("")
  const [showPopUp,setshowPopUp]=useState(false);
  const router = useRouter();
  const goToTablePage =async () => {
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
    const res=await axios.get(`/api/orders/${tableNum}`)
    const data=res.data
    if(data.message!==null){
      alert("Order Already Exists")
      setshowPopUp(true)
      return;
    }
    router.push(`/table/${tableNum}`)
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
        <input type="number"
          value={tableNum}
          
          className={styles.input}
          placeholder='Enter Table Number...'
          onChange={(e) => {
            setTableNum(e.target.value)
           

          }}
        />

        <button className={`${styles.button} ${macondo.className}`} onClick={goToTablePage}>New Order</button>
        <button className={`${styles.button} ${macondo.className}`}>View Orders</button>
        <Link href="./menu" className={styles.menu_link}>Menu</Link>
      </div>

      {showPopUp && <div className={styles.pop_up_div}> 
          <p>Order Already Exists for {tableNum}</p>
          <div className={styles.pop_upButtondiv}>
          <button className={styles.popUpbutton}>Update Order</button>
          <button className={styles.popUpbutton}>Cancel Order</button>
          <button className={styles.popUpbutton}>Go Back</button>
          </div>
      </div>
      }
    </>
  );
}
