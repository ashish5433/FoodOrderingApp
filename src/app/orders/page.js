'use client'
import React, { useEffect, useState } from 'react'
import styles from '@/app/styles/order.module.css'
import axios from 'axios'
import { redis } from '@/lib/redis'

const Page = () => {
    const [orders, setOrders] = useState([])
    const [expanded, setExpanded] = useState({})
    const [checkedItems, setCheckedItems] = useState({})
    useEffect(() => {
        const event = new EventSource('/api/orders/stream')
        event.onmessage=(event) => {
            const data = JSON.parse(event.data)

            setOrders(prev => prev.map(order => order._id === data.id ? {
                ...order,
                item: order.item.map((it, idx) => (
                    idx === data.index ? { ...it, checked: data.checked } : it
                ))
            } : order))
        }
        return () => event.close()
    }, [])

    const toggleExpand = (id) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
    }

    useEffect(() => {

        const fetchOrders = async () => {
            const res = await axios.get("/api/orders")
            const orders = res.data
            setOrders(orders)

            
            const initialChecked = {}
            orders.forEach(order => {
                initialChecked[order._id] = order.item.map(it => it.checked || false)
            })
            setCheckedItems(initialChecked)
        }

        fetchOrders()
    }, [])

    const handleCheck = (orderId, idx) => {
        const newChecked = !checkedItems[orderId]?.[idx]
        setCheckedItems(prev => {
            const updated = [...prev[orderId]]
            updated[idx] = !updated[idx]
            return { ...prev, [orderId]: updated }
        })

        axios.put(`/api/orders/redisUpdate/${orderId}/check`, {
            index: idx,
            checked: newChecked
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
