"use client"
import styles from './styles/home.module.css'
import { use, useState } from 'react';
import {useRouter} from 'next/navigation';
export default function Home() {
  const [tableNum,setTableNum]=useState("")
  const [errorMessage,seterrorMessage]=useState("")
  const [showError,setshowError]=useState(false)
  const router=useRouter();
  const goToTablePage=()=>{
    if(!tableNum.trim()){
        seterrorMessage("Enter Valid Table Number")
        setshowError(true)
        return;
    }
    setshowError(false)
    router.push(`/tabledata.js/${tableNum}`)
  }
  return (
    <>
     <div className={styles.nav}>
        <input type="text" 
        value={tableNum} 
        className={styles.input}
        placeholder='Enter Table '
        onChange={(e)=>{
          setTableNum(e.target.value)
          setshowError(false)

          }}
        />
        {showError && <p className={styles.errorPara}>{errorMessage}</p>}
        <button className={styles.button} onClick={goToTablePage}>New Order</button>
        <button className={styles.button}>View Orders</button>
     </div>
    </>
  );
}
