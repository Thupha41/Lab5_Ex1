import UserServiceORM from "../services/ORM/users.services";
import UserServiceStandardSQL from "../services/standardSQL/users.services";
import { USERS_MESSAGES } from "../constants/messages";
import dotenv from "dotenv";
import * as handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";
import nodemailer from "nodemailer";
import { formatResponse } from "../utils/response";
dotenv.config();

const useORM = process.env.useORM === "true";
const getListUser = async (req, res) => {
  const result = useORM
    ? await UserServiceORM.getAll()
    : await UserServiceStandardSQL.getAll();
  res.json(
    formatResponse(req.method, res.statusCode, {
      message: USERS_MESSAGES.GET_USER_SUCCESS,
      data: result,
    })
  );
};

const createUser = async (req, res) => {
  const result = useORM
    ? await UserServiceORM.create(req.body)
    : await UserServiceStandardSQL.create(req.body);
  res.json(
    formatResponse(req.method, res.statusCode, {
      message: USERS_MESSAGES.CREATE_USER_SUCCESS,
      data: result,
    })
  );
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = { id, ...req.body };

  let result = useORM
    ? await UserServiceORM.update(data)
    : await UserServiceStandardSQL.update(data);

  res.json(
    formatResponse(req.method, res.statusCode, {
      message: USERS_MESSAGES.UPDATE_USER_SUCCESS,
      data: result,
    })
  );
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  let result = useORM
    ? await UserServiceORM.delete(id)
    : await UserServiceStandardSQL.delete(id);

  res.json(
    formatResponse(req.method, res.statusCode, {
      message: USERS_MESSAGES.DELETE_USER_SUCCESS,
      data: result,
    })
  );
};

const sendEmail = async (req, res) => {
  const { email } = req.body;
  const filePath = path.join(__dirname, "../templates/send-email.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);

  const OTP = Math.floor(100000 + Math.random() * 900000);
  const replacements = {
    email: email,
    OTP: OTP,
  };
  const htmlToSend = template(replacements);

  // Set up Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GOOGLE_APP_EMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    },
  });

  // Send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"Reset Password" <${process.env.GOOGLE_APP_EMAIL}>`,
    to: `${email}`,
    subject: "Welcome!!",
    html: htmlToSend,
  });

  res.json(
    formatResponse(req.method, res.statusCode, {
      message: USERS_MESSAGES.EMAIL_SENT_SUCCESS,
      data: info.envelope,
    })
  );
};

module.exports = {
  getListUser,
  createUser,
  updateUser,
  deleteUser,
  sendEmail,
};
