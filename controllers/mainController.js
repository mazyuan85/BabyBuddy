const User = require("../models/User");
const Baby = require("../models/Baby");
const DiaperLog = require("../models/DiaperLog");
const SleepLog = require("../models/SleepLog");
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

const fetchSleepStatus = async (req, res) => {
    try {
    const babyId = req.params.id;
    const lastSleepLog = await SleepLog.findOne({ baby: babyId}).sort({createdAt:-1});

    return res.json(lastSleepLog)
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occured while retrieving sleep status"})
    }
}

const addSleepLog = async (req, res) => {
    try {
        const sleepData = req.body;
        const ongoingSleepLog = await SleepLog.findOne({ baby: sleepData.baby, isSleeping: true });
        if (ongoingSleepLog) {
            return res.status(500).json({ message: "This sleep log has already been added."})
        }
        const newSleepLog = new SleepLog({
            baby: sleepData.baby,
            startDateTime: sleepData.startDateTime,
            remarks: sleepData.remarks,
            isSleeping: true,
        })
        await newSleepLog.save();
        return res.json(newSleepLog)
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occured while adding sleep log."})
    }
}

const endSleepLog = async (req, res) => {
    try {
        const sleepData = req.body;
        const unclosedSleepLog = await SleepLog.findOne({ baby: sleepData.baby, isSleeping: true });
        if (!unclosedSleepLog) {
            return res.status(500).json({ message: "All sleep logs have already been closed."})
        }
        const startDateTime = new Date(unclosedSleepLog.startDateTime);
        const endDateTime = new Date(sleepData.endDateTime);

        if (startDateTime > endDateTime) {
            return res.status(500).json({ message: "Baby cannot wake up in the past!"})
        }
        const closeSleepLog = await SleepLog.updateOne(
            { _id: unclosedSleepLog._id},
            { isSleeping: false, endDateTime: sleepData.endDateTime, remarks: sleepData.remarks}
        )
        return res.json(closeSleepLog)
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occured while closing sleep log."})
    }
}

const lastSleepLog = async (req, res) => {
    try {
        const babyId = req.params.id;
        const lastSleepLog = await SleepLog.findOne({baby: babyId}).sort({startDateTime:-1})
        res.status(200).json(lastSleepLog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch last sleep log."})
    }
}

const getSleepLog = async (req, res) => {
    try {
        const babyId = req.query.baby;
        if (!babyId) {
            return res.status(400).json({ message: "Missing baby ID in query"})
        }
        const sleepLogs = await SleepLog.find({baby: babyId}).sort({ dateTime: -1})
        res.status(200).json(sleepLogs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving sleep logs" })
    }
}

const deleteSleepLog = async (req, res) => {
    try {
        const sleepLog = req.params.id;
        await SleepLog.findByIdAndDelete(sleepLog)
        return res.status(201).json({ message: "Sleep Log deleted."})
    } catch (err) {
        return res.status(500).json({ message: "An error occured while deleting the sleep log."})
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
    fetchSleepStatus,
    addSleepLog,
    endSleepLog,
    lastSleepLog,
    getSleepLog,
    deleteSleepLog,
}