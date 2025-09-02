import {redis} from '@/lib/redis'

export async function PUT(req,{params}){
    const {index,checked}=await req.json()
    const key=`order:${params.id}:checks`

    let current=await redis.get(key)
    current=current?JSON.parse(current):[]

    current[index]=checked

    await redis.set(key,JSON.stringify(current))

    await redis.publish("order-updates",JSON.stringify({
        type:"checked",
        orderId:params.id,
        index,
        checked
    }))

    return Response.json({success:true})
}