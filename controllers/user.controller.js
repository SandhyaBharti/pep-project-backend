import { comparePassword, generateToken, hashPassword } from "../lib/utils.js";

const users = [
    {
        id: 1,
        fullName: "Sandhya",
        email: "sandhya@gmail.com",
        password: "hashed_password",
    },
    {
        id: 2,
        fullName: "Sandhu",
        email: "sandhu@gmail.com",
        password: "hashed_password_2",
    },
];


export const getUser = (req, res) => {
    try {
        // TODO: fetch users from DB
        const { id } = req.params;

        const user = users.find(u => u.id === Number(id))
        delete user.password;

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user,
            message: "User fetched successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: `Error fetching user: ${error.message}`,
        });
    }
};

export const getAllUsers = (req, res) => {
    try {
        // TODO: fetch users from DB
        // TODO: remove password field from users array
        const updatedUsers = users.map((user) => {
            delete user.password;
            return user;
        });

        res.status(200).json({
            success: true,
            data: updatedUsers,
            message: "Users fetched successfully",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: `Error fetching all users: ${error.message}`,
        });
    }
};


export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if(!name.trim() || !email.trim() || !password.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please provide name, email and password",
            });
        }

        const existingUser = users.find((u) => u.email === email.trim())
        if(existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            })
        }

        const hashedPassword = await hashPassword(password.trim(), 10)

        const newUser = {
            id: Date.now(),
            name: name.trim(),
            email: email.trim(),
            password: hashedPassword,
        }
        users.push(newUser);

        // payload: is a container 
        const payload = {
            id: newUser.id,
        }    

        const token = generateToken(payload);

        

        res.status(201).json({
            success: true,
            message: "Users registered successfully",
            token
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            error: `Error creating user: ${error.message}`
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if(!email.trim() || !password.trim()) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid email and password",
            })
        }

        const existingUser = users.find((u) => u.email === email.trim());
        if(!existingUser){
            res.status(404).json({
                success: false,
                message: "Email or password is invalid",
            })
        }

        const isCorrectPassword = await comparePassword(password.trim(), existingUser.password);
        if(!isCorrectPassword) {
            return res.status(404).json({
                success: false,
                message: "Email or password is invalid",
            })
        }

        const payload = {
            id: existingUser.id
        }

        const token = generateToken(payload)
        
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token 
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: `Error while login user: ${error.message}`
        });
    }
}
export const updateUser = (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            error: `Error while updating user: ${error.message}`
        });
    }
}
export const deleteUSer = (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({
            success: false,
            error: `Error while deleting user: ${error.message}`,
        });
    }
}

