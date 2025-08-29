import dbConnect from "@/lib/dbConnnect";
import Order from '@/models/schema.js'
import {use} from 'react'

export const runtime="nodejs"
export async function GET(req,{params}){
    const {table}=await params

    try{
        await dbConnect();

        const res=await Order.findOne({table_no:table})

        return Response.json({message:res},{status:200})
    }catch(err){
        console.log("Error Geting Order by Table NUmber",err)
        return Response.json({error:err},{status:401})
    }


}


export async function DELETE(req,{params}){
    const {table}=await params
    try{
        await dbConnect();
        const res=await Order.findOneAndDelete({table_no:table})
        console.log(res)
        return Response.json({message:res},{status:200})
    }catch(err){
       return Response.json({Error:"Error Occured While Deleting Items"},{status:500})
    }
}