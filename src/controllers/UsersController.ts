import pool from '../dbconfig/dbconnection';
import randomNumber from '../services/randomNumber';
import sendSmsNotification from '../services/sendSmsNotification';

class UsersController {
    public async authenticate(req, res) {
        const { code } = req.body;
        try {
          pool.query("select * from users where code = $1 and expired_at >= now()", [code], (err, result) => {
            if (err) {
              res.status(400).send(err);
            } else {
              if (result.rows.length == 0) {
                res.status(404).json({ message: 'Please enter valid token' })
              } else {
                res.json({ message: 'Token is valid' })
              }
            }
          })
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async post(req, res) {
      try {
          const { phone_number } = req.body;

          pool.query("select * from users where phone_number = $1", [phone_number], (err, result) => {
            if (err) {
              res.status(400).send(err);
            } else {
              const code = randomNumber();

              if (result.rows.length == 1) {
                pool.query("update users set code = $1, expired_at = (now() + INTERVAL '1 min') where user_id = $2", [code, result.rows[0].user_id], (err, result1) => {
                  if (err) {
                    res.status(400).send(err);
                  } else {
                    sendSmsNotification(code, phone_number);
                    res.json({ message: 'Please check your phone for sms notification'});
                  }
                })

              } else {
                pool.query("insert into users (phone_number, code, expired_at) values($1, $2, (now() + INTERVAL '1 min'))", [phone_number, code], (err, result2) => {
                  if (err) {
                    res.status(400).send(err);
                  } else {
                    sendSmsNotification(code, phone_number);
                    res.json({ message: 'Please check your phone for sms notification' });
                  }
                })
              }
            }
          })
      } catch (error) {
          res.status(400).send(error);
      }
  }
}

export default UsersController;
