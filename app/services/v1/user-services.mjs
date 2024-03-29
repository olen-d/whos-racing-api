const createUser = async (db, newUser) => {
  try {
    const result = await db.collection('users').insertOne(newUser)
    return result
  } catch (error) {
    throw new Error(`User Services Create User ${error}`)
  }
}

const readAllUsers = async db => {
  const cursor = db.collection('users').find().project({ _id: 1, firstName: 1, lastName: 1, role: 1, username: 1 })

  try {
    const data = await cursor.toArray()
    return data
  } catch (error) {
    throw new Error(`User Services Read All Users ${error}`)
  }
}

const readUserByUsername = async (db, username) => {
  try {
    const options = { projection: { passwordHash: 0 } }
    const data = await db.collection('users').findOne({ username }, options)
    return data
  } catch (error) {
    throw new Error(`User Services Read User ${error}`)
  }
}

const readUserPasswordHash = async (db, info) => {
  const { username } = info
  const options = { projection: { passwordHash: 1 } }
  const query = { username }

  try {
    const data = await db.collection('users').findOne(query, options)
    return data
  } catch (error) {
    throw new Error(`User Services Read User Password Hash ${error}`)
  }
}

const readUserRole = async (db, info) => {
  const { username } = info
  const options = { projection: { role: 1 } }
  const query = { username }

  try {
    const data = await db.collection('users').findOne(query, options)
    return data
  } catch (error) {
    throw new Error(`User Services Read User Role ${error}`)
  }
}

const readUserRoleById = async (db, ObjectId, userId) => {
  const options = { projection: { role: 1 } }
  const query = { _id: ObjectId(userId) }

  try {
    const data = await db.collection('users').findOne(query, options)
    return data
  } catch (error) {
    throw new Error(`User Services Read User Role By Id ${error}`)
  }
}

export {
  createUser,
  readAllUsers,
  readUserByUsername,
  readUserPasswordHash,
  readUserRole,
  readUserRoleById
}
