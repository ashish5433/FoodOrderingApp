import dbConnect from "@/lib/dbConnnect";
import Order from '@/models/schema.js'
import {use} from 'react'

export const runtime="nodejs"
export async function GET(req,{params}){
    const {table}=params

    try{
        await dbConnect();

        const res=await Order.findOne({table_no:table})

        return Response.json({message:res},{status:200})
    }catch(err){
        console.log("Error Geting Order by Table NUmber",err)
        Response.json({error:err},{status:401})
    }


}


