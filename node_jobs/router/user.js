const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Resume = require('../models/resume');
// const Resume = require('../models/resume');

// ! MIDDLEWARES
const { checkLoggedIn, verifyUser} = require('../middlewares/index');

// CRUD -> show, edit, update
router.get('/users/:id', async (req, res) => {
	try {
		const foundUser = await User.findById(req.params.id);
		return res.render('user/show', { foundUser });
	} catch (error) {
		req.flash('error', 'Something went wrong while fetching a user, please try again later');
		console.log(error);
		return res.redirect('/jobs');
	}
});

router.get('/users/:id/edit', checkLoggedIn,verifyUser, async (req, res) => {
	try {
		const foundUser = await User.findById(req.params.id);
		return res.render('user/edit', { foundUser });
	} catch (error) {
		req.flash('error', 'Something went wrong while fetching a user, please try again later');
		console.log(error);
		return res.redirect('/jobs');
	}
});

router.patch('/users/:id', checkLoggedIn,verifyUser, async (req, res) => {
    // res.send(req.body);
	try {
		const userData = {
			CGPA: req.body.CGPA,
			gender: req.body.gender,
			dob: req.body.dob,
			phone: req.body.phone,
		};
		await User.findByIdAndUpdate(req.params.id, userData);
		req.flash('success', 'Successfully updated a user');
		return res.redirect(`/users/${req.params.id}`);
	} catch (error) {
		req.flash('error', 'Something went wrong while updating a user, please try again later');
		console.log(error);
		return res.redirect(`/users/${req.params.id}`);
	}
});

// ! resume

router.get('/users/:id/resume', checkLoggedIn, verifyUser, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		return res.render('user/new_resume', { user });
	} catch (error) {
		req.flash('error', 'Something went wrong while updating resume, please try again later');
		console.log(error);
		return res.redirect(`/users/${req.params.id}`);
	}
});

router.post('/users/:id/resume', checkLoggedIn, verifyUser, async (req, res) => {
	// res.send(req.body);
	try {
		const resume = new Resume({
			// ...req.body
			name: req.body.name,
			phone: req.body.phone,
			linkedIn: req.body.linkedIn,
			experience:[
				req.body.experience,
			],
			projects:[
				req.body.projects,
			],
			education:[
				req.body.education,
			],
			achievements: req.body.achievements
		});
		await resume.save();
		const user = await User.findById(req.user._id);
		user.resume = resume; //!<<==ye wala resume saved wala resume hain (resum ki obj id store hoga user:resume me. )
		await user.save();
		req.flash("success", "You successfully saved your resume");
		return res.redirect(`/users/${req.params.id}`);
	} catch (error) {
		req.flash('error', 'Something went wrong while updating resume, please try again later');
		console.log(error);
		return res.redirect(`/users/${req.params.id}`);
	}
});

router.get("/users/:id/show_resume",checkLoggedIn, verifyUser,async (req,res)=>{
	try {
		const user = await User.findById(req.params.id).populate('resume'); //! .populate() is pulout resume data from (resume: objectId) object id , now we can access resume (actule object) also , if we nont use .populate we access Id only,
		//^ populate('key: <== where obj Id store') we have to write key inside ('');
		//& populate('ref kaha pe hain')
		const resume = user.resume;
		return res.render('user/show_resume',{resume});
		// res.send(resume);
	} catch (error) {
		req.flash('error', 'Something went wrong while showing resume, please try again later');
		console.log(error);
		return res.redirect(`/users/${req.params.id}`);
	}
});

router.get('/users/:id/resume/edit',async(req,res)=>{
try {
	const foundUser = await User.findById(req.params.id).populate('resume');
	return res.send(foundUser.resume);
} catch (error) {
	req.flash('error', 'Something went wrong while fatching resume, please try again later');
		console.log(error);
		return res.redirect(`/users/${req.params.id}`);
}
})


module.exports = router;