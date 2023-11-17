import { TweetSchema } from "./model.js";


export const createTweetValidator = async (req, res, next) => {
    const { body = {}, decoded = {} } = req;

    const { success, data, error } = await TweetSchema.safeParseAsync({
        ...body,
        photo: req.file?.path,
    });

    if (!success) {
        return next({
            message: 'Validator error',
            status: 400,
            error,
        });
    }

    req.validatedTweet = data;

    next();
};