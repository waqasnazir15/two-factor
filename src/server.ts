import express from 'express';
import usersRouter from './routers/UsersRouter';
import pool from './dbconfig/dbconnection';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

class Server {
  private app;

  constructor () {
    dotenv.config();
    this.app = express();
    this.config();
    this.routerConfig();
    this.dbPoolConnection();
  }

  private routerConfig () {
    this.app.use('/users', usersRouter);
  }

  private config() {
    this.app.use(bodyParser.urlencoded({ extended:true }));
    this.app.use(bodyParser.json({ limit: '1mb' }));
  }

  private dbPoolConnection() {
    pool.query("SELECT NOW()", (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log('Connection has been established successfully')
      }
    })
  }

  public start = (port: number) => {
    return new Promise((resolve, reject) => {
        this.app.listen(port, () => {
            resolve(port);
        }).on('error', (err: Object) => reject(err));
    });
  }
}

export default Server;
