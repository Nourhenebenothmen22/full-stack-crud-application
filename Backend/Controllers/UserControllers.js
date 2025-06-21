const userModel = require("../Models/user");

// Créer un utilisateur
const createUser = async (req, res) => {
    try {
        const user = new userModel(req.body);
        await user.save();

        res.status(200).json({
            success: true,
            message: "User is created",
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "User is not created: " + error.message,
            data: null
        });
    }
};

// Supprimer un utilisateur
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await userModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: "User is deleted",
            data: deletedUser
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "User is not deleted: " + error.message,
            data: null
        });
    }
};

// Lister tous les utilisateurs
const listUser = async (req, res) => {
    try {
        const users = await userModel.find();

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to fetch users: " + error.message,
            data: null
        });
    }
};
// Récupérer un utilisateur par ID
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to fetch user: " + error.message,
            data: null
        });
    }
};
// Mettre à jour un utilisateur
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
            new: true,        // retourne le document mis à jour
            runValidators: true // applique les validations du schéma
        });

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                data: null
            });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Unable to update user: " + error.message,
            data: null
        });
    }
};



module.exports = {
    createUser,
    deleteUser,
    listUser,
    getUserById,
    updateUser
};
