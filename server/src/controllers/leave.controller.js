import prisma from "../utils/client.js";
import { createLeave } from "../services/leave.service.js";

export const lastYearLeave = async (req, res) => {
    const {nik} = req.params;

    const lastYear = new Date().getFullYear() - 1;

    const startDate = new Date(`${lastYear}-01-01`);
    const endDate = new Date(`${lastYear}-12-31`);

    try {
        const leave = await prisma.tb_balance.findFirst({
            where: {
                NIK : nik,
                receive_date : {
                    gte : startDate,
                    lte : endDate
                }
            },
            select: {
                amount : true
            }
        });

        if (!leave) {
            return res.status(404).json({message: 'Last years leave quota not found'});
        }

        res.json(leave);
    } 
        catch (error) {
            console.error('Gagal mengambil data:', error);
            res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data' });
        }
    
};

export const currentYearLeave = async (req, res) => {
    const {nik} = req.params;

    const currentYear = new Date().getFullYear();

    const startDate = new Date(`${currentYear}-01-01`);
    const endDate = new Date(`${currentYear}-12-31`);

    try {
        const leave = await prisma.tb_balance.findFirst({
            where: {
                NIK : nik,
                receive_date : {
                    gte : startDate,
                    lte : endDate
                }
            },
            select: {
                amount : true
            }
        });

        if (!leave) {
            return res.status(404).json({message: 'Current years leave quota not found'});
        }

        res.json(leave);
    } 
        catch (error) {
            console.error('Gagal mengambil data:', error);
            res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data' });
        }
    
}

export const createLeaveRequest = async (req, res) => {
    try {

        const user = req.session.user;

        const leave = await createLeave({
            ...req.body,
            NIK : user.NIK
        })

        res.status(201).json({
            message: "Leave request created successfully",
            data: leave
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}