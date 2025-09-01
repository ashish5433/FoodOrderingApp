'use client'
import React, { useEffect, useState } from 'react'
import styles from '@/app/styles/order.module.css'
import axios from 'axios'

const Page = () => {
    const [orders, setOrders] = useState([])
    const [expanded, setExpanded] = useState({}) 
    const [checkedItems, setCheckedItems] = useState({}) 
    useEffect(()=>{

        const viewOrders = async () => {
            const res = await axios.get('/api/orders')
            setOrders(res.data)
            const initialChecked = {}
            res.data.forEach(order => {
                initialChecked[order._id] = new Array(order.item.length).fill(false)
            })
            setCheckedItems(initialChecked)
        }
        viewOrders()
    },[])

    const toggleExpand = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
    }

    const handleCheck = (orderId, idx) => {
        setCheckedItems(prev => {
            const updated = [...prev[orderId]]
            updated[idx] = !updated[idx]
            return { ...prev, [orderId]: updated }
        })
    }

    const completeOrder = async () => {
        alert(`Order completed! ✅`)
        
    }

    return (
        <>
           

            <div className={styles.container}>
                {orders.map((order) => {
                    const allChecked =
                        checkedItems[order._id]?.every(Boolean) || false

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
                                                        checked={checkedItems[order._id]?.[idx] || false}
                                                        onChange={() => handleCheck(order._id, idx)}
                                                    />
                                                    {it.name} — ₹{it.price} × {it.qty}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        disabled={!allChecked}
                                        onClick={() => completeOrder()}
                                    >
                                        Complete Order
                                    </button>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Page
