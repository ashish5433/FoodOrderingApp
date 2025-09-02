import { redis } from '@/lib/redis'

export async function PUT(req, { params }) {
    const { index, checked } = await req.json()
    const { id } = await params
    const key = `order:${id}:checks`

    let current = await redis.get(key)
    if (current) {
        try {
            current = JSON.parse(current)
            if (!Array.isArray(current)) current = [] 
        } catch {
            current = []
        }
    } else {
        current = []
    }
    console.log(typeof current)
    current[index]=checked

    await redis.set(key, JSON.stringify(current))

    await redis.publish("order-updates", JSON.stringify({
        type: "checked",
        orderId: id,
        index,
        checked
    }))

    return Response.json({ success: true })
}