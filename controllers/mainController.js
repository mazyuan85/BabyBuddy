const User = require("../models/User");
const Baby = require("../models/Baby");
const DiaperLog = require("../models/DiaperLog");
const cloudinary = require("../config/cloudinaryConfig");
const FormData = require('form-data');

const index = async (req, res) => {
    console.log(req)
}

const showBabies = async (req, res) => {
    try {
        const allBabies = await Baby.find({user: req.user._id}).exec();
        res.status(200).send(allBabies);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err})
    }
}

const addBaby = async (req, res) => {
    try {
        const {user_id, babyData} = req.body;
        
        const newBaby = new Baby({
            ...babyData,
            user: user_id,
        })        
        await newBaby.save();
        
        const user= await User.findById(user_id);
        user.babies.push(newBaby._id)
        await user.save();

        return res.status(201).json({ 
            message: "Baby added successfully.",
            baby: newBaby,
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occured while adding the baby."})
    }   
}

const showBaby = async (req, res) => {
    try {
        const baby = await Baby.findById(req.params.id);
        if (!baby) {
            return res.status(404).json({ message: "Baby not found" });
          }
          return res.json(baby);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occured while retrieving baby's details."})
    }
}

const editBaby = async (req, res) => {
    try {
        const { babyData } = req.body;
        const baby = await Baby.findById(req.params.id);
        
        if (!baby) {
            return res.status(404).json({ message: "Baby not found" });
        }

        baby.name = babyData.name;
        baby.dateOfBirth = babyData.dateOfBirth;
        if (babyData.imageURL) {
            baby.imageURL = babyData.imageURL;
        }
        await baby.save();

        return res.json(baby);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occured while editing baby's details."})
    }
}

const deleteBaby = async (req, res) => {
    try {
        const { user_id } = req.body;
        const baby = await Baby.findById(req.params.id);
        const user = await User.findById(user_id);
        
        if (!baby) {
            return res.status(404).json({ message: "Baby not found" });
        }

        await Baby.findByIdAndDelete(req.params.id);

        await User.findOneAndUpdate({_id: user_id}, {$pull: {babies: baby._id}});

        return res.status(201).json({ message: "Baby deleted."});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occured while retrieving baby's details."})
    }
}

const getDiaperLog = async (req, res) => {
    try {
        const babyId = req.query.baby;
        if (!babyId) {
            return res.status(400).json({ message: "Missing baby ID in query"})
        }
        const diaperLogs = await DiaperLog.find({baby: babyId}).sort({ dateTime: -1})
        res.status(200).json(diaperLogs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving diaper logs" })
    }
}

const addDiaperLog = async (req, res) => {
    try {
    const newDiaperLog = new DiaperLog({...req.body})
    await newDiaperLog.save();

    return res.status(201).json({ 
        message: "Diaper log added successfully."
    })
    } catch (err) {
        return res.status(500).json({ message: "An error occured while adding the diaper log."})
    }   
}

const deleteDiaperLog = async (req, res) => {
    try {
        const diaperLog = req.params.id;
        await DiaperLog.findByIdAndDelete(diaperLog)
        return res.status(201).json({ message: "Diaper Log deleted."})
    } catch (err) {
        return res.status(500).json({ message: "An error occured while deleting the diaper log."})
    }
}

const lastDiaperLog = async (req, res) => {
    try {
        const babyId = req.params.id;
        const lastDiaperLog = await DiaperLog.findOne({baby: babyId}).sort({dateTime:-1})
        res.status(200).json(lastDiaperLog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch last diaper logs."})
    }
}

const getSingleDiaperLog = async (req, res) => {
    try {
        const singleDiaperLog = await DiaperLog.findById(req.params.id);
        if (!singleDiaperLog) {
          return res.status(404).json({ message: "Diaper Log not found" });
        }
        return res.status(200).json(singleDiaperLog);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occured while retrieving diaper log details."})
    }
}

const editSingleDiaperLog = async (req, res) => {
    try {
        const diaperData = req.body;
        const diaper = await DiaperLog.findById(req.params.id);
        
        if (!diaper) {
            return res.status(404).json({ message: "Diaper not found" });
        }
        diaper.type = diaperData.type;
        diaper.remarks = diaperData.remarks;
        diaper.dateTime = diaperData.dateTime;
      
        await diaper.save();

        return res.json(diaper);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occured while editing diaper log details."})
    }
}

module.exports ={
    index,
    showBabies,
    addBaby,
    editBaby,
    deleteBaby,
    showBaby,
    getDiaperLog,
    addDiaperLog,
    deleteDiaperLog,
    lastDiaperLog,
    getSingleDiaperLog,
    editSingleDiaperLog,
}