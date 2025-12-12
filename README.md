# Pegasus

Це репозиторій з простою статичною сторінкою та версією на React (Vite).

Що зроблено:
- Проведено базове покращення доступності (a11y) та SEO: додано `meta description`, skip-link, семантичні теги та `aria`-атрибути.
- Винесено CSS у `public/styles.css` та оптимізовано структуру стилів.
- Покращено мобільне меню з клавіатурною доступністю (підтримка `Escape`, `aria-expanded`).
- Додано мінімальну React-версію (файли під `src/`) з компонентом `App`.

Файли у репозиторії:
- `public/index.html` — відлагоджена статична версія сторінки.
- `public/styles.css` — стилі для сторінки.
- `src/App.jsx` — React-компонент, конвертований зі статичної сторінки.
- `src/main.jsx` — точка входу React (Vite).
- `package.json` — скрипти для розробки та збірки.

Як запускати локально (потрібен Node.js >=18 рекомендовано):

1) Встановіть залежності:

```bash
npm install
```

2) Запустіть dev-сервер:

```bash
npm run dev
```

3) Відкрийте у браузері адресу, яку виведе Vite (наприклад, http://localhost:5173).

Ще пропозиції для покращення (можу зробити за бажанням):
- Додати unit/e2e тести для компонентів.
- Підключити оптимізацію зображень (lazy + srcset).
- Налаштувати CI (GitHub Actions) для перевірки лінтерів і збірки.

Додано простий Express бекенд для збереження контактів (`server.js`) з API:
	- `POST /api/contact` — приймає `{name,email,message}` і зберігає у `data/messages.json`.
	- `GET /api/messages` — повертає всі повідомлення.
	- `DELETE /api/messages` — очищає всі повідомлення.

Як запускати сервер (порядок):

1) Встановіть залежності:

```bash
npm install
```

2) У двох терміналах запустіть Vite та сервер (або лише сервер для статичної версії):

Vite (dev):
```bash
npm run dev
```

Сервер (API + статичні файли):
```bash
npm run server
```

Після запуску сервера API буде доступний на порту `5174` за замовчуванням (можна змінити через `PORT`), а статичні файли — на тому порту, де сервер працює (якщо ви використовуєте тільки сервер).

Адмін інтерфейс
- Встановіть змінні оточення `ADMIN_USER` та `ADMIN_PASS` для безпечнішого доступу (за замовчуванням `admin`/`password`).
- Відкрийте у браузері: `http://localhost:5174/admin.html` (або з Vite: `http://localhost:р5173/admin.html` при розробці).
- Для експорту/очищення/перегляду повідомлень використовуйте адмін‑інтерфейс або API:

Login API:
```bash
POST /api/admin/login  { "username": "...", "password": "..." }
```

Після логіну використовуйте заголовок `Authorization: Bearer <token>` для викликів:

```bash
GET /api/admin/messages
DELETE /api/admin/messages
GET /api/admin/export  # CSV
```

Якщо хочете — запустити `npm install` тут у контейнері та перевірити dev-сервер. Напишіть, що робимо далі.

**Deployment / 24/7 (Docker, PM2, systemd)**

- **Docker (рекомендую для простого 24/7 запуску):**

	Збірка образу:

	```bash
	docker build -t pegasus:latest .
	```

	Запуск контейнера з автоматичним рестартом і збереженням `data` на хості:

	```bash
	docker run -d \
		--name pegasus \
		--restart unless-stopped \
		-p 5174:5174 \
		-v $(pwd)/data:/usr/src/app/data \
		pegasus:latest
	```

	Це забезпечить, що контейнер буде перезапускатися автоматично (24/7) при рестарті хоста або помилках.

- **PM2 (альтернатива для сервера без Docker):**
```markdown
# Pegasus

Це репозиторій з простою статичною сторінкою та версією на React (Vite).

Що зроблено:
- Проведено базове покращення доступності (a11y) та SEO: додано `meta description`, skip-link, семантичні теги та `aria`-атрибути.
- Винесено CSS у `public/styles.css` та оптимізовано структуру стилів.
- Покращено мобільне меню з клавіатурною доступністю (підтримка `Escape`, `aria-expanded`).
- Додано мінімальну React-версію (файли під `src/`) з компонентом `App`.

Файли у репозиторії:
- `public/index.html` — відлагоджена статична версія сторінки.
- `public/styles.css` — стилі для сторінки.
- `src/App.jsx` — React-компонент, конвертований зі статичної сторінки.
- `src/main.jsx` — точка входу React (Vite).
- `package.json` — скрипти для розробки та збірки.

Як запускати локально (потрібен Node.js >=18 рекомендовано):

1) Встановіть залежності:

```bash
npm install
```

2) Запустіть dev-сервер:

```bash
npm run dev
```

3) Відкрийте у браузері адресу, яку виведе Vite (наприклад, http://localhost:5173).

Ще пропозиції для покращення (можу зробити за бажанням):
- Додати unit/e2e тести для компонентів.
- Підключити оптимізацію зображень (lazy + srcset).
- Налаштувати CI (GitHub Actions) для перевірки лінтерів і збірки.

Додано простий Express бекенд для збереження контактів (`server.js`) з API:
	- `POST /api/contact` — приймає `{name,email,message}` і зберігає у `data/messages.json`.
	- `GET /api/messages` — повертає всі повідомлення.
	- `DELETE /api/messages` — очищає всі повідомлення.

Як запускати сервер (порядок):

1) Встановіть залежності:

```bash
npm install
```

2) У двох терміналах запустіть Vite та сервер (або лише сервер для статичної версії):

Vite (dev):
```bash
npm run dev
```

Сервер (API + статичні файли):
```bash
npm run server
```

Після запуску сервера API буде доступний на порту `5174` за замовчуванням (можна змінити через `PORT`), а статичні файли — на тому порту, де сервер працює (якщо ви використовуєте тільки сервер).

Адмін інтерфейс
- Встановіть змінні оточення `ADMIN_USER` та `ADMIN_PASS` для безпечнішого доступу (за замовчуванням `admin`/`password`).
- Відкрийте у браузері: `http://localhost:5174/admin.html` (або з Vite: `http://localhost:р5173/admin.html` при розробці).
- Для експорту/очищення/перегляду повідомлень використовуйте адмін‑інтерфейс або API:

Login API:
```bash
POST /api/admin/login  { "username": "...", "password": "..." }
```

Після логіну використовуйте заголовок `Authorization: Bearer <token>` для викликів:

```bash
GET /api/admin/messages
DELETE /api/admin/messages
GET /api/admin/export  # CSV
```

Якщо хочете — запустити `npm install` тут у контейнері та перевірити dev-сервер. Напишіть, що робимо далі.

**Deployment / 24/7 (Docker, PM2, systemd)**

- **Docker (рекомендую для простого 24/7 запуску):**

	Збірка образу:

	```bash
	docker build -t pegasus:latest .
	```

	Запуск контейнера з автоматичним рестартом і збереженням `data` на хості:

	```bash
	docker run -d \
		--name pegasus \
		--restart unless-stopped \
		-p 5174:5174 \
		-v $(pwd)/data:/usr/src/app/data \
		pegasus:latest
	```

	Це забезпечить, що контейнер буде перезапускатися автоматично (24/7) при рестарті хоста або помилках.

- **PM2 (альтернатива для сервера без Docker):**

	Встановіть PM2 глобально та запустіть конфіг:

	```bash
	npm install -g pm2
	pm2 start ecosystem.config.js
	pm2 startup
	pm2 save
	```

	PM2 буде перезапускати процес при збоях та може налаштувати автозапуск після перезавантаження системи.

- **systemd (шаблон для VPS):**

	У файлі `deploy/pegasus.service` є приклад юніту systemd. Щоб використати його:

	1. Скопіюйте `deploy/pegasus.service` в `/etc/systemd/system/pegasus.service` і змініть `WorkingDirectory` та `User` під ваші налаштування.
	2. Запустіть:

	```bash
	sudo systemctl daemon-reload
	sudo systemctl enable --now pegasus.service
	sudo journalctl -u pegasus -f
	```

Примітка про збереження даних: за замовчуванням `data/messages.json` у контейнері буде зберігатися в образі — використовуйте bind-mount або docker volume (приклад вище) щоб зберегти повідомлення між перезапусками контейнера.

Якщо хочете — можу додати `docker-compose.yml` з дефолтною конфігурацією, або зробити GitHub Actions для автоматичного збірки/пушу образу при комітах. Що обрати?

**Статичний URL локально (наприклад, http://pegasus.local)**

Щоб завжди мати однаковий URL на локальній машині або сервері, можна використати `docker-compose` з nginx-проксі, який виставить сайт на `http://pegasus.local`.

1) Додано `docker-compose.yml` і `deploy/nginx.conf`.

2) Додайте в `/etc/hosts` (локально) рядок:

```bash
echo "127.0.0.1 pegasus.local" | sudo tee -a /etc/hosts
```

3) Зберіть і запустіть стек:

```bash
docker compose up -d --build
```

4) Відкрийте `http://pegasus.local` — nginx проксуватиме трафік до сервісу `pegasus` на порті `5174`.

Якщо ви хочете, можу автоматично згенерувати самопідписаний TLS сертифікат і додати підтримку HTTPS у проксі.
```