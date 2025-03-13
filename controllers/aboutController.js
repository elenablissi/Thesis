/*
Controller function for handling the "about" route

@author Elena Blisi
*/

export const about = (req,res) => {
    res.render("about.ejs", { page: 'about' });
};