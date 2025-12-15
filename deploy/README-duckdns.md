DuckDNS + Traefik (безплатний варіант)
======================================

Цей документ показує, як отримати безплатний піддомен через DuckDNS і використати його з Traefik для стабільної HTTPS-ссилки.

1) Зареєструйся на DuckDNS
- Відкрий https://www.duckdns.org/ та авторизуйся через GitHub/Google/Reddit.
- У розділі "domains" створіть піддомен, наприклад `pegasus-yourname` — повний домен: `pegasus-yourname.duckdns.org`.
- Скопіюй свій token (зліва від піддомену) — він знадобиться лише якщо хочеш автоматично оновлювати IP.

2) На VPS/сервері
- Копіюй репозиторій і перейдіть у папку проєкту.

```
git clone <your-repo-url>
cd Pegasus
cp .env.example .env
# Відредагуй .env
# DOMAIN=pegasus-yourname.duckdns.org
# LETSENCRYPT_EMAIL=you@example.com
```

- Якщо сервер знаходиться за змінним IP (наприклад домашній ПК), налаштуй оновлення DuckDNS (на сайті є приклади скриптів). На VPS зазвичай IP статичний, тож пропуск можна опустити.

3) Переконайся, що `deploy/traefik/acme.json` існує і має права `600`:

```
mkdir -p deploy/traefik
touch deploy/traefik/acme.json
chmod 600 deploy/traefik/acme.json
```

4) Відкрий порти 80 і 443 на VPS (firewall/NAT).

5) Запусти продакшн стек:

```
./deploy/start-traefik-prod.sh
```

6) Перевірка
- В браузері відкрий `https://pegasus-yourname.duckdns.org` — Traefik автоматично запитає сертифікат у Let's Encrypt через HTTP challenge.
- Перевірити логи Traefik: `docker logs -f traefik`.

Поради
- Якщо Let's Encrypt блокує через rate limits, тимчасово використай staging (додається інша конфіг опція в `docker-compose.prod.yml`).
- DuckDNS піддомен безкоштовний і підходить для довготривалого використання; залишай порти відкритими на VPS для оновлення сертифікатів.
