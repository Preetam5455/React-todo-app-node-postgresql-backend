const dbConfig = require('./databaseConfig');

const createTodo = async (id,date,time,todo,edited,complete)=>{
    const result = await dbConfig.query(
        'INSERT INTO List (id,date,time,todo,edited,complete) VALUES ($1, $2 , $3, $4, $5,$6) RETURNING *',
        [id,date,time,todo,edited,complete]
      );
      return result.rows[0];
}


const getAllTodos = async ()=>{
  const result = await dbConfig.query(
      'SELECT * FROM List',
    );
    return result.rows;
}

const updateTodo = async (todo, edited, complete,id) =>{
  const result = await dbConfig.query(
    `UPDATE List
        SET todo = $1, edited = $2, complete = $3
        WHERE id = $4 RETURNING *`,
        [todo, edited, complete, id]
  )
  return result.rows[0];
}

const deleteTodo = async(id) => {
  const result = await dbConfig.query(
    `DELETE FROM List WHERE id = $1 RETURNING *`,
    [id]
  )
  return result.rows[0];
}

module.exports = { createTodo,getAllTodos,updateTodo,deleteTodo}