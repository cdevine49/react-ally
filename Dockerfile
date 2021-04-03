FROM node:15.12.0-alpine3.13
MAINTAINER Conor Devine <conorjdevine@gmail.com>

ARG APP_USER=node
ARG APP_GROUP=node
ARG APP_USER_ID=1000
ARG APP_GROUP_ID=1000

RUN if [[ $APP_GROUP_ID != 1000 ]]; then addgroup -g $APP_GROUP_ID -S $APP_GROUP; fi && \
			if [[ $APP_USER_ID != 1000 ]]; then adduser -S -s /sbin/nologin -u $APP_USER_ID -G $APP_GROUP $APP_USER; fi && \
			mkdir /app && \
			chown $APP_USER:$APP_GROUP /app

WORKDIR /app
USER $APP_USER

EXPOSE 9001

CMD ["yarn", "storybook"]
