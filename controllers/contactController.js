/*
Controller functions for handling 
Contact Form routes

@author Elena Blisi
*/

// Import Nodemailer for sending emails
import nodemailer from "nodemailer";



// GET CONTACT PAGE
export const getContactPage = (req, res) => {
    // Check if there is a status in session
    if (req.session.status != null) {
      var status = req.session.status;
      req.session.status = null; // Clear the status from the session
      res.render("contact.ejs", { page: "contact", status });
    } else {
      req.session.status = null;
      res.render("contact.ejs", { page: "contact", status });
    }
  };



// POST CONTACT FORM
export const postContactForm = async (req, res) => {
    const {full_name, email, phone, subject, description} = req.body;
  
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport ( {
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER, // Admin email address
        pass: process.env.EMAIL_PASS // Admin email pass
      }
    });
  
    // Email options and structure for contact forms
    const mailOptions = {
      from: process.env.EMAIL_USER, // Admin email as the sender
      to: process.env.EMAIL_USER, // Admin email as the recipient
      subject:`Contact Form Submission: ${subject}`, 
      text: `Name: ${full_name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${description}`
    };
  
    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      //Set session flag
      req.session.status = true;
      res.redirect('/contact'); //Redirect to contact page after success
  
    } catch (error){
      console.error("Error sending email:", error); // Log the error if email sending fails
      //Set session flag to indicate failure
      req.session.status = false; 
      res.redirect("/contact"); //Redirect to contact page after failure
    }
  };