"use client"
import React, { useEffect, useState } from "react"
import styles from "@/app/styles/order.module.css"
import axios from "axios"
import { db } from "@/lib/firebase"
import { doc, onSnapshot, setDoc } from "firebase/firestore"

const Page = () => {
  const [orders, setOrders] = useState([])
  const [expanded, setExpanded] = useState({})

  const fetchOrders = async () => {
      const res = await axios.get("/api/orders")
      setOrders(res.data)

      res.data.forEach((order) => {
        const ref = doc(db, "checkboxes", order._id)
        onSnapshot(ref, (snap) => {
          if (snap.exists()) {
            const data = snap.data()
            setOrders((prev) =>
              prev.map((item) =>
                item._id === order._id
                  ? {
                      ...item,
                      item: item.item.map((it, idx) => ({
                        ...it,
                        checked: data.checks[idx] ?? false, 
                      })),
                    }
                  : item
              )
            )
          }
        })
      })
    }
  useEffect(()=>{
    fetchOrders()
  },[])
  useEffect(() => {
    let pusherClient;
    let channel;
    (async ()=>{
      const Pusher=(await import("pusher-js")).default
      pusherClient=new Pusher(
        process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      }
      )
      // console.log(pusherClient)
      channel=pusherClient.subscribe('food-orders')
      channel.bind('Order-Created',(data)=>{
        console.log("New Data", data)
        setOrders((prev)=>[data,...prev])
      })
    })()

    return () => {
      try {
        if (channel) {
          channel.unbind_all();
          channel.unsubscribe();
        }
        if (pusherClient) pusherClient.disconnect();
      } catch (e) {
        console.log("Pusher Error ",e)
      }
    };
  }, [])

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleCheck = async (orderId, idx) => {
    const order = orders.find((item) => item._id === orderId)

    const updatedChecks = order.item.map((it, i) =>
      i === idx ? !(it.checked ?? false) : (it.checked ?? false)
    )

    await setDoc(doc(db, "checkboxes", orderId), {
      checks: updatedChecks,
    })
  }

  return (
    <div className={styles.container}>
      {orders.map((order) => {
        const allChecked = order.item.every((it) => it.checked ?? false)

        return (
          <div key={order._id} className={styles.card}>
            <div
              className={styles.cardHeader}
              onClick={() => toggleExpand(order._id)}
            >
              <h3>Table {order.table_no}</h3>
              <p>Status: {order.status}</p>
              <p>Total: ₹{order.total}</p>
            </div>

            {expanded[order._id] && (
              <div className={styles.cardBody}>
                <ul>
                  {order.item.map((it, idx) => (
                    <li key={idx}>
                      <label>
                        <input
                          type="checkbox"
                          className={styles.customCheckbox}
                          checked={it.checked ?? false}
                          onChange={() => handleCheck(order._id, idx)}
                        />
                        {it.name} — ₹{it.price} × {it.qty}
                      </label>
                    </li>
                  ))}
                </ul>
                <button disabled={!allChecked}>Complete Order</button>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Page
