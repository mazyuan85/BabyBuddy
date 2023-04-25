# Baby Tracking App

This baby tracking app is a web-based application that helps parents track and monitor their baby's growth and development. The app allows users to log and manage information about diaper changes, sleep patterns, feeding, milestones, and growth data.

The application was written for my newborn girl who was born on 24 April 2023, and the idea was inspired by [Roscxn](https://github.com/roscxn/).

## Features

- User authentication: Sign up and log in functionality.
- Dashboard: Overview of the baby's latest activities and growth data.
- My Babies: Add, edit, and manage multiple babies.
- Diaper Log: Add, edit, and view diaper change records.
- Sleep Log: Add and view sleep records.
- Feed Log: Add, edit, and view feeding records.
- Appointment Reminders: Add, edit, and view appointment records, including the ability to trigger e-mail reminder notifications.
- Milestone Checklist: View and manage baby's milestones.
- Growth Tracker: Add and view growth data, including height and weight, displayed on graphs based on Singapore Ministry of Health's child booklet. (https://www.healthhub.sg/sites/assets/Assets/Programs/parenting_portal/pdf/ECN_CHB_A5_72pp_Web.pdf)

## Timeframe

7 working days

## Deployment

https://babybuddy-qsh6.onrender.com/

## User Stories
| As a Guest, when I...                    |  I want to be able to...                
| :--------------------------------------- |:-----------------------------------------------|       
| View the Home Page                       |  - See a picture carousel containing snippets of what the app can do<br>- See a list of features that the app contains<br>- See a call-to-action button

| As a verified user, when I...            |  I want to be able to...                
| :--------------------------------------- |:-----------------------------------------------|   
| Access My Account features               |  - View all my babies<br>- Edit my babies' details<br>- Delete a baby
| View My Dashboard                        |  - Select my baby<br>- See an overview of my baby's last feed, diaper change and sleep<br>- Click a button to add a feed, diaper change, or sleep
| Access the Navigation Bar Drawer         |  - Return to the dashboard<br>- Acesss to View/Add my baby's feed, diaper, and sleeping logs<br>- View/Add upcoming medical appointments<br>- View/Track my baby's growth<br>- View my baby's milestones
| Add a Medical Appointment                |  - Have the option to trigger an e-mail notification reminder on the day of the appointment
| View the Growth Tracker                  |  - Compare my baby's growth with the national average
| Click the BabyBuddy Icon on the Navbar   |  - Return to the dashboard

## Technologies Used

- React.js (including React Router and hooks)
- Material-UI for styling and theming
- Recharts for charting and data visualization
- Day.js for date and time handling
- Express.js for the server-side (API)
- Nodemailer for sending e-mails
- MongoDB for database storage

## Database Model

![DatabaseSchema](https://raw.githubusercontent.com/mazyuan85/BabyBuddy/main/public/images/readme/dbmodel.png)

## Development Approach

- Construct the wireframe with a mobile-responsive web-app in mind (as parents will unlikely be sitting on their desktop to input data)
- Generate the Navigation Bar, CSS theme and overall HTML look of the website
- User authentication
- Building the core features
    - Add/View/Edit Feed Log
    - Add/View/Edit Sleep Log (including the logic to close out every sleep log before opening a new one)
    - Add/View/Edit Diaper Log
- Building the optional features
    - Add/View/Edit Growth Tracker
    - Add/View/Edit Appointments (including sending e-mail notifications)
    - View/Edit Milestones
- Debugging

## Key Takeaways

- Implementing application logic requires meticulous effort taking into consideration all possible combinations
- When building an app from scratch, it's better to lay out a well-thought out plan right at the start to prevent wasteful efforts during the actual development phase
- When possible, let the database do the hard work of sorting, finding, arranging.
- Protect the routes from unauthorized access

## Future Improvements

- Based on the data collected and through the use of statistics and AI, make accurate predictions on whether baby is growing well. If not, provide subtle reminders to nudge the parents in the right direction.
- Improve reminder feature by revamping it into a HTML email with graphics.

## Resources

- Midjourney for generating artwork