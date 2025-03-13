/*
Controller function for handling the "openingHours" route

@author Elena Blisi
*/

export const openingHours = (req,res) => {
    res.render("openingHours.ejs", { page: 'openingHours' });
};