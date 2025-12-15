Traefik production deploy
========================

This repository includes `docker-compose.prod.yml` configured to run Traefik (v2) in front of the Pegasus app. Follow these steps on your VPS to get a stable HTTPS URL using your own domain.

Prerequisites
- A VPS or server with Docker and Docker Compose (Docker Compose v2) installed.
- A domain name and ability to add/change DNS records.
- Ports 80 and 443 open to the internet.

Steps
1. Clone the repo on your VPS and change to the project directory.

```
git clone <your-repo-url>
cd Pegasus
cp .env.example .env
# Edit .env: set DOMAIN and LETSENCRYPT_EMAIL and admin creds
```

2. Ensure `deploy/traefik/acme.json` exists and is writable by the Docker host (the helper script does this):

```
chmod 600 deploy/traefik/acme.json || true
```

3. Start the stack:

```
./deploy/start-traefik-prod.sh
```

4. Verify:
- Visit `https://$DOMAIN` in a browser. Traefik will request certificates from Let's Encrypt automatically.
- Check container status: `docker compose -f docker-compose.prod.yml ps`.
- Traefik logs: `docker logs -f traefik`.

Notes and troubleshooting
- If Let's Encrypt rate limits occur, consider using the staging environment first by adding Traefik ACME staging flags.
- For a stable administration UI (Traefik dashboard) you can enable the dashboard by adding `--api.insecure=true` (not recommended on public hosts) or secure it behind additional auth.

Alternatives
- If you prefer not to open ports, use Cloudflare Tunnel instead (see `deploy/README-cloudflared.md` if added).
