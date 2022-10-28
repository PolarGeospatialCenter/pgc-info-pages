FROM pgc-docker.artifactory.umn.edu/mirror/centos/nodejs-10-centos7
ADD . .
USER root
RUN chown -R 1001:0 ${APP_ROOT}/src/dist
USER 1001
RUN npm install
RUN gulp dist

FROM pgc-docker.artifactory.umn.edu/mirror/nginxinc/nginx-unprivileged:1.21
COPY --from=0 /opt/app-root/src/build /usr/share/nginx/html
ADD ./nginx/nginx.conf /etc/nginx/nginx.conf
ADD ./nginx/default.conf /etc/nginx/conf.d/default.conf
