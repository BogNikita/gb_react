import { apiMiddleware } from "redux-api-middleware";
import messageMiddelware from "./messageMiddelware";

export default [apiMiddleware, messageMiddelware];