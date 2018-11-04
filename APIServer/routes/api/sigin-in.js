/**
 * @swagger
 * tags:
 * - name: User
 *   description: 사용자 관리에 필요한 API
 */

/**
 * @swagger
 * /sign-in/{username}/{password}:
 *   get:
 *     tags:
 *     - "User"
 *     summary: Returns user info if success to sign in
 *     description: "로그인에 성공하면 유저의 정보를 리턴합니다"
 *     produces:
 *     - "application/json"
 *     parameters:
 *     - name: "username"
 *       in: "path"
 *       description: "user의 이름"
 *       required: true
 *       type: "string"
 *     - name: "password"
 *       in: "path"
 *       description: "user의 비밀번호"
 *       required: true
 *       type: "string"
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: "string"
 *             password:
 *               type: "string"
 *             success:
 *               type: "boolean"
 */

var express = require('express');
var router = express.Router();
// var rsUser = require('../../model/rs-user');
var Database = require('../../model/common');

router.get('/:username/:password', function (req, res, next) {
    var username = req.params.username;
    var password = req.params.password;
    var json = {username, password};
    // console.log(username, password);
    // rsUser.selectOne(username, password, (rows) => {
    var sql = 'select * from rs_user where username = ? and password = ?';
    let data = [
        username, password
    ];
    Database.query(sql, data, (rows) => {
        if (rows.length == 0) {
            json['success'] = false;
        } else {
            json['success'] = true;
        }

        console.log(json);
        res.send(json);
    });
});

module.exports = router;
