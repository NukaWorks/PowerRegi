import mongoose from 'mongoose'


class Database {
  constructor(dbUri) {
    this.dbUri = dbUri
  }

  async connect() {
    await mongoose.connect(this.dbUri)
  }
}

