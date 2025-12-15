Ngrok long-running service
=========================

This folder includes a `systemd` unit to run `ngrok` as a background service for the Pegasus app. Use this when you want to keep a public tunnel active on a machine that you control (VPS, home server, etc.).

Important notes
- You still need an ngrok account and authtoken. Register at https://dashboard.ngrok.com/signup and run on the host:

```
ngrok config add-authtoken YOUR_AUTHTOKEN
```

- The free ngrok tier may rotate public hostnames and has session/connection limits; for a stable domain use a VPS + reverse proxy (Traefik) or a paid ngrok plan.

Install & enable (on the target host)

1. Copy this repo to the host (or `git clone` into `/home/www-data/Pegasus`).
2. Ensure `node` and `npm` are installed and `npx` is available.
3. Install your authtoken:

```
ngrok config add-authtoken YOUR_AUTHTOKEN
```

4. Create a systemd unit file (we included `deploy/ngrok.service`). Copy it to `/etc/systemd/system/`:

```
sudo cp deploy/ngrok.service /etc/systemd/system/pegasus-ngrok.service
sudo systemctl daemon-reload
sudo systemctl enable --now pegasus-ngrok.service
sudo journalctl -u pegasus-ngrok -f
```

5. The public URL will be visible in the ngrok local web UI on the host: `http://127.0.0.1:4040`.

Alternatives for long-term uptime
- Deploy the app to a small VPS and run `docker-compose.prod.yml` with Traefik (recommended for a fixed domain + Let's Encrypt).
- Use Cloudflare Tunnel (requires Cloudflare account and configuring a zone) for a free, more-stable tunnel without interstitials.
