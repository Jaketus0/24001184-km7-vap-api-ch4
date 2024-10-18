const express = require("express");
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(express.json());

app.post("/api/v1/users", async(req,res) => {
    try {
        const newUser = req.body;
        const user = await prisma.user.create({
        data: {
            email: newUser.email,
            password: newUser.password,
            name: newUser.name
        },
    })
    res.send({
        message: "create user success",
        data: user,
    });
    } catch (error) {
        res.status(400).send("create user failed");
    }
});

app.get("/api/v1/users", async(req,res) => {
    try {
        
        const users = await prisma.user.findMany();
        res.send(users);
    } catch (error) {
        res.status(400).send("get users failed");
    }
});

app.get("/api/v1/users/:id", async(req,res) => {
    try {
        const userId = req.params.id;
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(userId),
            },
        });
    
        if(!user) {
            return res.status(400).send("User not found");
        }
        res.send(user);
        
    } catch (error) {
        res.send("get user failed");
    }
});

app.delete("/api/v1/users/:id", async(req,res) => {
    try {
        const userId = req.params.id;
        await prisma.user.delete({
            where: {
                id: parseInt(userId),
            },
        });
        res.send("delete users success");
        if(!user) {
            return res.status(400).send("User not found");
        }
    } catch (error) {
        res.send("delete user failed");
    }
});

app.patch("/api/v1/users/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = req.body;
        const user = await prisma.user.update({
            where: {
                id: parseInt(userId),
            },
            data: {
                email: updatedUser.email,
                password: updatedUser.password,
                name: updatedUser.name,
            },
        });
        res.send({
            message: "update user success",
            data: user,
        });
    } catch (error) {
        res.status(400).send("update user failed");
    }
});


app.post("/api/v1/profile", async(req,res) => {
    try {
        const newProfile = req.body;
        const profile = await prisma.profile.create({
            data: {
                userId: newProfile.userId,
                address: newProfile.address,
                identityType: newProfile.identityType,
                identityNumber: newProfile.identityNumber,
            },
        });
        res.send({
            message: "create profile success",
            data: profile,
        });
        
    } catch (error) {
        res.send("create profile failed");
    }
});

app.get("/api/v1/profile", async(req,res) => {
    try {
        const profiles = await prisma.profile.findMany();
        res.send(profiles);
    } catch (error) {
        res.send("get profile failed");
    }
});

app.get("/api/v1/profile/:id", async(req,res) => {
    try {
        const profileId = req.params.id;
        const profile = await prisma.profile.findUnique({
            where: {
                id: parseInt(profileId),
            },
        });
        res.send({
            message: "get profile success",
            data: profile,
        })
    } catch (error) {
        res.send("get profile failed");
    }
});

app.delete("/api/v1/profile/:id", async(req,res) => {
    try {
        const profileId = req.params.id;
        await prisma.profile.delete({
            where: {
                id: parseInt(profileId),
            },
        });
        res.send("delete profile success");
        if(!profile) {
            return res.status(400).send("Profile not found");
        }
    } catch (error) {
        res.send("delete profile failed");
    }
});

app.patch("/api/v1/profile/:id", async (req, res) => {
    try {
        const profileId = req.params.id;
        const updatedProfile = req.body;
        const profile = await prisma.profile.update({
            where: {
                id: parseInt(profileId),
            },
            data: {
                address: updatedProfile.address,
                identityType: updatedProfile.identityType,
                identityNumber: updatedProfile.identityNumber,
            },
        });
        res.send({
            message: "update profile success",
            data: profile,
        });
    } catch (error) {
        res.status(400).send("update profile failed");
    }
});


app.post("/api/v1/accounts", async(req,res) => {
    try {
        const newAccount = req.body;
        const account = await prisma.bank_accounts.create({
            data: {
                userId: newAccount.userId,
                bankName: newAccount.bankName,
                bankAccountNumber: newAccount.bankAccountNumber,
                balance: newAccount.balance,
            },
        });
        res.send({
            message: "create account success",
            data: account,
        });
        
    } catch (error) {
        res.send("create account failed");
    }
});

app.get("/api/v1/accounts", async(req,res) => {
    try {
        const accounts = await prisma.bank_accounts.findMany();
        res.send(accounts);
        
    } catch (error) {
        res.send("get account failed");
    }
});

app.get("/api/v1/accounts/:id", async(req,res) => {
    try {
        const accountId = req.params.id;
        const account = await prisma.bank_accounts.findUnique({
            where: {
                id: parseInt(accountId),
            },
        });
    
        if(!account) {
            return res.status(400).send("Account not found");
        }
        res.send(account);
        
    } catch (error) {
        res.send("get account failed");
    }
});

app.delete("/api/v1/accounts/:id", async(req,res) => {
    try {
        const accountId = req.params.id;
        await prisma.bank_accounts.delete({
            where: {
                id: parseInt(accountId),
            },
        });
        res.send("delete account success");
        
    } catch (error) {
        res.send("delete account failed");
    }
});

app.patch("/api/v1/accounts/:id", async (req, res) => {
    try {
        const accountId = req.params.id;
        const updatedAccount = req.body;
        const account = await prisma.account.update({
            where: {
                id: parseInt(accountId),
            },
            data: {
                bankName: updatedAccount.bankName,
                bankAccountNumber: updatedAccount.bankAccountNumber,
                balance: updatedAccount.balance,
            },
        });
        res.send({
            message: "update account success",
            data: account,
        });
    } catch (error) {
        res.status(400).send("update account failed");
    }
});


app.post("/api/v1/transactions", async(req,res) => {
    try {
        const newTransaction = req.body;
        const transaction = await prisma.transaction.create({
            data: {
                sourceAccountId: newTransaction.sourceAccountId,
                destinationAccountId: newTransaction.destinationAccountId,
                amount: newTransaction.amount,
            },
        });
        res.send({
            message: "create transaction success",
            data: transaction,
        });
        
    } catch (error) {
        res.status(400).send("create transaction failed");
    }
});

app.get("/api/v1/transactions", async(req,res) => {
    try {
        const transactions = await prisma.transaction.findMany();
        res.send(transactions);
        
    } catch (error) {
        res.status(400).send("get transaction failed");
    }
});

app.get("/api/v1/transactions/:id", async(req,res) => {
    try {
        const transactionId = req.params.id;
        const transaction = await prisma.transaction.findUnique({
            where: {
                id: parseInt(transactionId),
            },
        });
    
        if(!transaction) {
            return res.status(400).send("Transaction not found");
        }
        res.send(transaction);
        
    } catch (error) {
        res.send("get transaction failed");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})