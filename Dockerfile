FROM php:8.1-apache

# Установка системных зависимостей
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    unzip \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Установка PHP расширений
RUN docker-php-ext-install \
    pdo \
    pdo_mysql \
    zip

# Установка Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Включение mod_rewrite для Apache
RUN a2enmod rewrite

# Копирование composer.json и установка зависимостей
COPY api/composer.json api/composer.lock* /var/www/html/api/
WORKDIR /var/www/html/api
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Возвращаемся в корневую директорию
WORKDIR /var/www/html

# Копирование всех файлов проекта
COPY . /var/www/html/

# Настройка прав доступа
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Настройка Apache
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# Экспорт порта
EXPOSE 80

# Запуск Apache
CMD ["apache2-foreground"]
