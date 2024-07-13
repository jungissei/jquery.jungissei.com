FROM php:8.3.9-apache

COPY apache2.conf /etc/apache2/apache2.conf

RUN a2enmod include && \
    a2enmod cgi
