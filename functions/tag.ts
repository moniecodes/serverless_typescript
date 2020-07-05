/*
 *   Copyright (c) 2020 System, Inc
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

export { };

'use strict';

const AWS = require('aws-sdk');
const cloudWatchLogs = new AWS.CloudWatchLogs();
const logger = require('../lib/log');
const retry = require("async-retry");
const env = process.env.ENV;

// ~~~ Function Handlers ~~~
module.exports.tagExistingLogGroups = async () => {
	logger.debug("Tagging existing log groups..");

	const logGroupNames = await getLogGroups();

	for (const logGroupName of logGroupNames) {
		try {
			await tag(logGroupName);
		} catch (error) {
			logger.warn("Cannot tag existing log group, skipped...", { logGroupName }, error);
		}
	}
};

module.exports.tagNewLogGroups = async (event) => {
	logger.debug("Received new log group...", { event });

	const logGroupName = event.detail.requestParameters.logGroupName;
	await tag(logGroupName);
};

// ~~~ Private Helpers ~~~

const filter = async (logGroupName: string, filter: string) => {
	logger.debug("Filtering log group...", { logGroupName });

	if (logGroupName.includes(filter)) { return true; }
	return false;
};

const tag = async (logGroupName: string) => {
	try {
		if (await filter(logGroupName, env)) {
			await tagLogGroup(logGroupName)
		}
	} catch (err) {
		logger.error("Failed to tag log group", { logGroupName }, err);
		throw err;
	}
};

const getLogGroups = async () => {
	const loop = async (nextToken, groups = []) => {
		let req = {
			nextToken: nextToken
		};

		if (process.env.PREFIX) {
			req = { ...req, ...{ logGroupNamePrefix: process.env.PREFIX } };
		}

		try {
			const resp = await retry(
				(bail) => cloudWatchLogs
					.describeLogGroups(req)
					.promise()
					.catch(bailOnFatalError(bail)),
				getRetryConfig((err) => logger.warn("retrying describeLogGroup after error...", { req }, err))
			);
			const logGroupNames = resp.logGroups.map(x => x.logGroupName);
			groups = groups.concat(logGroupNames);

			if (resp.nextToken) {
				return await loop(resp.nextToken, groups);
			} else {
				return groups;
			}
		} catch (error) {
			logger.error(`Failed to fetch log groups, processing the fetched groups [${groups.length}] so far`, error);
			return groups;
		}
	};

	return await loop(null, []);
};

const tagLogGroup = async (logGroupName: string) => {
	const tags = { "env": env }
	const req = {
		logGroupName: logGroupName,
		tags: tags
	};

	logger.debug("Tagging log group....", {
		logGroupName,
		tags
	});

	await retry(
		(bail) => cloudWatchLogs
			.tagLogGroup(req)
			.promise()
			.catch(bailOnFatalError(bail)),
		getRetryConfig((err) => {
			logger.warn("Retrying putSubscriptionFilter after error...", { logGroupName }, err);
		})
	);

	logger.info("Succesfully tagged log group", {
		logGroupName,
		tags
	});
};

const bailOnFatalError = (bail) => (error) => {
	if (!error.retryable) {
		bail(error);
	} else {
		throw error;
	}
}

const getRetryConfig = (onRetry) => (
	{
		retries: parseInt(process.env.RETRIES || "5"),
		minTimeout: parseFloat(process.env.RETRY_MIN_TIMEOUT || "5000"),
		maxTimeout: parseFloat(process.env.RETRY_MAX_TIMEOUT || "60000"),
		factor: 2,
		onRetry
	}
);