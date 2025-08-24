'use client'
import {use} from 'react'

export default function ProfilePage({ params }) {
    const {table}=use(params)
  return (

    <div style={{color:"white"}}>
      <h1>Profile Page</h1>
      <p>User ID: {table}</p>
    </div>
  );
}

