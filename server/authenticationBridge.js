const express = require("express");
const router = express.Router();
const logger = require('./util/logger');
const handleStatusCode = require('./util/handleStatusCode');
const HttpStatus = require('http-status-codes');
const AuthenticationConnector = require("./services/AuthenticationService");
const getDomainObjectByServiceName = require('./util/subscriptionsHandler.js').getDomainObjectByServiceName;

const authConnector = new AuthenticationConnector();

router.post("/JWTtoken/:id", (req, res) => {
	const brandId = req.params.id;
	const appKey = req.query.client_id;
	const appSecret = req.query.client_secret;
	const domain = getDomainObjectByServiceName(
		'sentinel',
		req.session.passport.user.csdsCollectionResponse).baseURI;

	let args = {};
	args.headers = {};
	args.headers['content-type'] = req.header('content-type');

	authConnector
		.getAppJWT(brandId, appKey, appSecret, domain, args)
		.then(resolve => {
			const statusCode = resolve['1'].statusCode;
			if (handleStatusCode(statusCode)) {
				const accessToken = resolve['0']['access_token'];
				const tokenType = resolve['0']['token_type'];
				res.status(statusCode).send({
					'access_token': accessToken,
					'token': tokenType
				});
			} else {
				res.status(statusCode).send(resolve[1].statusMessage);
			}

		}).catch(err => {
			logger.error(err);
			res.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.send({
					error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
				});
	});
});

module.exports = router;
