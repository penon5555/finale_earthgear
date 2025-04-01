const prisma = require("../config/prisma")

exports.create = async (req, res) => {
    try {
        //code
        const { name } = req.body
        const category = await prisma.category.create({
            data: {
                name: name
            }
        })
        res.send(category)
    } catch (err) {
        //error
        console.log(500)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.list = async (req, res) => {
    try {
        //code
        const category = await prisma.category.findMany()
        res.send(category)
    } catch (err) {
        //error
        console.log(500)
        res.status(500).json({ message: "Server Error" })
    }
}

exports.remove = async (req, res) => {
    try {
        //ดึง id จาก req.params
        const { id } = req.params
        const category = await prisma.category.delete({
            where: {
                id: Number(id)
            }
        })
        res.send(category)
    } catch (err) {
        console.log(500)
        res.status(500).json({ message: "Server Error" })
    }
}
