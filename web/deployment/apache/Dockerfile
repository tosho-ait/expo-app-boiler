FROM ubuntu:14.04

RUN apt-get update && apt-get install -y

# Install apache, PHP, and supplementary programs. curl and lynx-cur are for debugging the container
RUN DEBIAN_FRONTEND=noninteractive apt-get -y install apache2 libapache2-mod-php5 php5-mysql php5-pgsql php5-gd php-pear php-apc php5-curl curl lynx-cur

# Enable apache mods.
RUN a2enmod php5
RUN a2enmod rewrite
RUN a2enmod proxy
RUN a2enmod proxy_http
RUN a2enmod remoteip
RUN a2enmod headers
RUN a2enmod ssl

# Update the PHP.ini file, enable <? ?> tags and quieten logging
RUN sed -i "s/short_open_tag = Off/short_open_tag = On/" /etc/php5/apache2/php.ini
# RUN sed -i "s/error_reporting = .*$/error_reporting = E_ERROR | E_WARNING | E_PARSE/" /etc/php5/apache2/php.ini

# Manually set up the apache environment variables
ENV APACHE_RUN_USER www-data
ENV APACHE_RUN_GROUP www-data
ENV APACHE_LOG_DIR /var/log/apache2
ENV APACHE_LOCK_DIR /var/lock/apache2
ENV APACHE_PID_FILE /var/run/apache2.pid

EXPOSE 80
EXPOSE 443

# Update the default apache site with the config we created.
ADD apache-config.conf /etc/apache2/sites-enabled/000-default.conf

# By default, delete exiting pid files (bugfix) and start apache
# Provide existing certificates as arguments
CMD rm -f /var/run/apache2/apache2.pid && ls -l /etc/letsencrypt/live/ | grep '^d' | grep -oE '[^ ]+$' | awk '{print "-D" $0}' | sed 's/\.//g' | xargs /usr/sbin/apache2ctl $1 -D FOREGROUND

#CMD /bin/sh -c 'while :; do sleep 24h & wait $${!}; /usr/sbin/apache2ctl reload; done & (rm -f /var/run/apache2/apache2.pid && /usr/sbin/apache2ctl -D FOREGROUND)'
