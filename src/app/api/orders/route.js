import dbConnect from '@/lib/dbConnnect.js';

import Order from '@/models/schema.js'
export const runtime = "nodejs"

export async function POST(req) {
   
    try {
        await dbConnect()
        const { table_num, items, total } = await req.json();

        if (!table_num || !Array.isArray(items) || items.length === 0) {
            return Response.json({ error: "Invalid Payload", status: 400 })
        }

        const doc = await Order.create({
            table_no: table_num,
            item: items,
            total: total,
            status: "pending"
        })

        return Response.json({ message: "Order Saved", status: 201 })
    } catch (err) {
        console.error("Error in posting order",err);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}


export async function GET(){
    try{
        //  console.log("✅ GET /api/orders reached");
        await dbConnect();
        console.log("Db is connected")
    }catch(err){
        console.log('Db is not Connected ',err)
    }
    try{
        // await dbConnect();
        const data=await Order.find().sort({createdAt:-1})

        return Response.json(data,{status:201})
    }catch(err){
        console.error(err);
        return Response.json({ error: "Server error" }, { status: 500 });
    }
}