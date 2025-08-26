import prisma from "../../utils/client.js";

export const expiredLeave = async () => {
    const now = new Date()
    const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

    try {
        const pendingLeaves = await prisma.tb_leave.findMany({
            where: {
                status: 'pending',
                start_date: {
                    lte: todayDate
                }
            }
        })

        if (pendingLeaves.length === 0) {
            console.log('[CRON] There is no pending leave that has passed its start date')
            return
        }

        const updateStatus = pendingLeaves.map((leave) =>
            prisma.tb_leave.update({
                where: { id_leave: leave.id_leave },
                data: { status: 'expired' }
            })
        )
        await Promise.all(updateStatus)
        console.log(`[CRON] ${updateStatus.length} leave data successfully changed to expired status`)

    } catch (error) {
        console.error('[CRON] Failed to update leave status to expired : ', error)
        throw error
    }
}