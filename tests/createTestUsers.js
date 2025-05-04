const User = require("../models/User");

const createTestUsers = async () => {
    await User.bulkCreate([{username: "test", email:"test@test.com", role:"user", password:"test"},
        {username: "test1", email:"test@test1.com", role:"user", password:"test1"},
        {username: "test2", email:"test@test2.com", role:"user", password:"test2"},
        {username: "test3", email:"test@test3.com", role:"user", password:"test3"},
        {username: "test4", email:"test@test4.com", role:"user", password:"test4"},
        {username: "test5", email:"test@test5.com", role:"user", password:"test5"},
        {username: "test6", email:"test@test6.com", role:"user", password:"test6"},
        {username: "test7", email:"test@test7.com", role:"user", password:"test7"},
    ])
    console.log("Test users inserted correctly!");
}

module.exports = createTestUsers