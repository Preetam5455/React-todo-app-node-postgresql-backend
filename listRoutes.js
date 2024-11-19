const express = require('express');
const router = express.Router();

const {createTodo,getAllTodos, updateTodo, deleteTodo} = require('./listModel');
const { route } = require('./main');

router.post('/list', async (req, res) => {
    try {
      const {id,date,time,todo,edited,complete} = req.body;
      const list = await createTodo(id,date,time,todo,edited,complete);
      res.status(201).json(list);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/list', async (req, res) => {
    try {
      const list = await getAllTodos();
      if (!list) return res.status(404).json({ error: 'List not found' });
      res.status(201).json(list);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.put('/list/:id', async(req,res)=>{
    try{
      const {id} = req.params;
      const {todo, edited, complete} =req.body;
      const list = await updateTodo(todo, edited, complete,id);
      if(!list) return res.status(404).json({ error: 'todo not found' });
      res.json(list);
    }catch(error){
      res.status(500).json({ error: error.message });
    }
  })

  router.delete('/list/:id', async (req,res)=>{
    try{
    const {id} = req.params;
    const list = deleteTodo(id);
    if(!list) return res.status(404).json({ error: 'todo not found'});
    res.json(list);
  }catch(error){
    res.status(500).json({ error: error.message });
  }
  })

  module.exports = router;