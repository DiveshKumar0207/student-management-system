const  { adminRegister } = require("../../db/models/adminSchema");


exports.createAdmin = async (req,res) => {
  try {
    const admin = new adminRegister({
      firstname: 'John',
      lastname: 'Doe',
      email: 'kumardiv151@example.com',
      password: "example@123", 
    });

    await admin.save();
    console.log('Admin user created successfully!');
    res.send("admin created");
  } catch (error) {
    console.error('Error creating admin:', error);
  }
};


