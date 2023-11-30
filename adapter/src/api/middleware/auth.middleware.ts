import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as HTTPResponseUtils from "../../utils/httpResponseUtils";
import * as constants from "../../utils/constants";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
	let response;

	if (req.method === "GET" || req.method === "POST") {
		const authorization = req.headers.authorization;

		if (!authorization || !authorization.startsWith("Bearer ")) {
			response = await HTTPResponseUtils.internalServerErrorResponse("Bearer Token Required!");
			console.error(`Middleware verifyToken :: Token Required!`);
			return res.status(response.statusCode).json(response.httpResponseMessage);
		}

		const tokenArray = authorization.split(" ");
		const token = tokenArray[1];

		if (!token) {
			response = await HTTPResponseUtils.internalServerErrorResponse("Bearer Token Required!");
			console.error(`Middleware verifyToken :: Token Required!`);
			return res.status(response.statusCode).json(response.httpResponseMessage);
		}

		try {
			const tdecoded = jwt.verify(token, constants.JWT_KEY);
			let jwtTokenPayload = tdecoded as jwt.JwtPayload;

			if (jwtTokenPayload.org != process.env.ORG_NAME) {
				console.error(`Middleware verifyToken :: Invalid token. Org mismatch`);

				throw new Error("Invalid token. Org mismatch");
			}

			req.body.user = tdecoded;
		} catch (err) {
			if (err instanceof jwt.TokenExpiredError) {
				console.error(`Middleware verifyToken :: JWT token expired`);
				response = await HTTPResponseUtils.internalServerErrorResponse("Expired token!");
				return res.status(response.statusCode).json(response.httpResponseMessage);
			} else {
				console.error(`Middleware verifyToken :: Invalid JWT token`);
				response = await HTTPResponseUtils.internalServerErrorResponse("Session expired!");
				return res.status(response.statusCode).json(response.httpResponseMessage);
			}
		}

		return next();
	} else {
		return HTTPResponseUtils.internalServerErrorResponse("Invalid HTTP method");
	}
};
