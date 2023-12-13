# Student Management System

## Description

This project is a web-based Student Management System designed for small educational institutes. It provides a range of functionalities, including attendance tracking, student and course management, teacher management, and fee payment, all accessible from a single website.

## Installation

1. **Clone the Repository:**
   ```
   git clone https://github.com/yourusername/student-management-system.git
2. **Install Dependencies:**
   ```
   cd student-management-system
   npm install
3. **Create Environment Variables:**
Create an `.env` file in the project root directory. Add the necessary environment variables, including any database connection information, API keys, and other sensitive information.

4. **Generate JWT Token:**
Generate a JWT token using the crypto module or another suitable method, and add it to your `.env` file for authentication and security.

## Usage

1. **Start the Application:**
   ```
   npm run dev
2. **Access the Application:**
Open your web browser and go to `http://localhost:3000` to access the Student Management System.

3. **User Management:**
- **Admin Registration:** Admin can admit a user by registering them.
- **Password Reset:** After a student is registered with a dummy password, they must reset their password via OTP sent to their email.

4. **Course Management:**
- Admin can create and manage courses.
- Student and teacher data can be updated.

5. **Attendance Tracking:**
- Admin and teachers can take attendance of students.
- View student attendance based on their batches.

6. **Notice Board:**
- Admin can publish notices on the website, visible to every student and teacher using the platform.

7. **Inquiry Feature:**
- Users who are not students or staff can reach the institute by filling a form on the login page.
- Users can provide their details and what information or assistance they require.
<!-- - All inquiry data and a short summary of each conversation between inquirers and admin staff will be stored for better communication. -->

8. **Admin Dashboard:**
- Admin dashboard is complete, providing access to various administrative tasks.

9. **Student and Teacher Dashboards:**
- Pending completion. Students will be able to view their attendance, check their fees, and read notices. Teachers can access their information and take student attendance.

## Features

- **Attendance Tracking:** Record and view student attendance.
- **Student List:** View and manage the list of enrolled students.
- **Course Management:** Create, edit, and manage courses.
- **Teacher Management:** Manage teachers and their information.
- **Fee Payment:** Easily pay fees through the website.
- **Notice Board:** Admin can publish notices for students and teachers.
- **Inquiry Feature:** Users can inquire about institute-related information.

## Configuration

- Customize your application by modifying the `.env` file with relevant configuration options.

## Contributing

We welcome contributions to improve and expand the functionality of the Student Management System. 


## Support or Contact

If you need assistance or have any questions, please contact us at [linkedIn](https://www.linkedin.com/in/diveshkumar0207) .

## Future Update

We have exciting plans for future updates.


