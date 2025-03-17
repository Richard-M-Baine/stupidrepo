const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const {Charities} = require('../models') 
const {Messages} = require('../models')
const { setTokenCookie, restoreUser, requireAuth } = require('../middleware/authenticate.js');
const router = express.Router();

router.get('/sent', restoreUser, requireAuth, async (req, res) => {
    const myMessages = await Messages.findAll({
        where: { sender: req.user.userName }
    });
    console.log('i am here here are the messages ',myMessages)

    const response = { Messages: myMessages.map(message => message.toJSON()) };
    console.log('its me the response ',response)
    return res.status(200).json(response);
});

router.get('/response', restoreUser, requireAuth, async (req, res) => {
    const myMessages = await Messages.findAll({
        where: { recipient: req.user.userName }
    });

    const response = { Messages: myMessages.map(message => message.toJSON()) };
    return res.status(200).json(response);
});

router.post('/create', restoreUser, requireAuth, async (req, res) => {
    const {sender, body, recipient} = req.body

    const newMessage = await Messages.create ({
        sender: sender,
        body: body,
        recipient: recipient,
        hasRead: false
    })

    res.json(newMessage)
    
})

router.delete('/:id/delete', restoreUser, requireAuth, async (req, res) => {

    const messageId= req.params.id
    
    const message = await (Messages.findByPk(messageId))

    if (message.sender === req.user.userName){
        await message.destroy()
        return res.json({
            message: "Successfully deleted",
            statusCode: 200
        });
    }

    else {
        return res.status(403).json({ message: "Unauthorized" });
    }
})



router.put('/:id/edit', restoreUser, requireAuth, async (req, res) => {
    

    const message = await Messages.findByPk(req.params.id)

// better way

if (message){
  if (group.sender !== req.user.userName) {
    const err = new Error('You must be the owner to edit this group')
    err.status = 403
    return err.status
  }}

 const { sender, body, hasRead, recipient } = req.body



group.set({
    sender: sender,
    body: body,
    hasRead: hasRead,
    recipient: recipient
  })
  
  await group.save()
  
  
  res.json(group)

 



})


module.exports = router