# Install Ghost blogging platform and run development environment on port 5000
#
# VERSION 0.0.2

FROM ubuntu:12.04
MAINTAINER Matt Voss "voss.matthew@gmail.com"
WORKDIR /data/ghost

# Install dependencies for nginx installation
RUN sed 's/main$/main universe/' -i /etc/apt/sources.list
RUN apt-get update && apt-get upgrade -y && apt-get clean

RUN apt-get install -y wget curl unzip build-essential checkinstall zlib1g-dev libyaml-dev libssl-dev telnet less \
    libgdbm-dev libreadline-dev libncurses5-dev libffi-dev iputils-ping iputils-tracepath rsyslog supervisor \
    python-software-properties sendmail python g++ make software-properties-common rlwrap git-core && \
    apt-get clean && \
    add-apt-repository -y ppa:chris-lea/node.js && apt-get update && apt-get upgrade -y && apt-get clean && \
    apt-get install -y nodejs

RUN dpkg-divert --local --rename --add /sbin/initctl && \
    ln -s /bin/true /sbin/initctl

RUN echo "*.* @172.17.42.1:514" >> /etc/rsyslog.d/90-networking.conf

# Add Ghost zip to image
ADD ghost-0.3.2.zip /tmp/

# Unzip Ghost zip to /data/ghost
RUN unzip -uo /tmp/ghost-0.3.2.zip -d /data/ghost

# Add custom config js to /data/ghost
ADD config.example.js /data/ghost/config.js
ADD supervisor-ghost.conf /etc/supervisor/conf.d/
ADD supervisor-rsyslogd.conf /etc/supervisor/conf.d/

# Install Ghost with NPM
RUN cd /data/ghost/ && npm install --production
RUN cd /data/ghost/content/themes/ && git clone https://github.com/gertjanleemans/GhostScroll.git

# Volumes
VOLUME ["/data/ghost/content/images", "/data/ghost/content/data", "/data/ghost/content/themes"]

# Expose port 2368
EXPOSE 2368

# Run Ghost
CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/supervisord.conf"]
