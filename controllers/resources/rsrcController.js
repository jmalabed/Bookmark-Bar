// const express = require('express')
//
// const router = express.Router()
//
// const Topic = require('../../models/topics.js');
// const Resource = require('../../models/resource.js');
// const topicData = require('../../data/topicData.js')
// const resourceData = require('../../data/resourceData.js')
//
// // new route resources
// router.get('/new',(req,res)=>{
//   res.render('resources/new.ejs')
// })
//
// //index route
// router.get('/',(req,res)=>{
//   Resource.find({}, (err, allr) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(allr);
//         res.render('resources/index.ejs', {resource:allr})
//     }
//   })
// })
//
// // //show route
// // router.get('/:id', (req,res)=>{
// //   id = req.params.id
// //   Topic.findById(id,(err,foundTopic)=>{
// //     Resource.find({}, (err, allResources)=> {
// //       if (err) {
// //         console.log(err);
// //       } else {
// //         res.render('resources/show.ejs', {
// //           resources:allResources,
// //           topic:foundTopic
// //         }
// //       )}
// //     })
// //   })
// // })
//
// //edit route - GOOD
// router.get('/:id/edit', (req, res)=>{
// const id = req.params.id
//   Resource.findById(id, (err, foundResource)=>{
//     if(err){
//       res.send(err)
//     } else {
//       res.render('resources/edit.ejs', {resource:foundResource})
//     }
//   })
// })
//
// //DELTE ROUTE:
// router.delete('/:id',(req,res)=>{
//   id = req.params.id
//   Resource.findByIdAndRemove(id, (err,removeRsrc)=>{
//     if (err) {
//       res.send(err);
//     } else {
//       res.redirect('/resources')
//     }
//   })
// })
//
// //UPDATE is BUGGY
// router.put('/:id', (req,res)=>{
// const id = req.params.id
// const updatedResourceData = req.body
//   Resource.findByIdAndUpdate(id,updatedResourceData, {new: true}, (err,updatedResource) => {
//       res.redirect('/resources')
//   })
// })
//
// //POST ROUTE
// router.post('/', (req,res)=>{
//   Resource.create(req.body,(err,newResource)=>{
//     if (err) {
//       console.log(err);
//     } else {
//       res.redirect('/resources')
//     }
//   })
// })
//
// module.exports = router
