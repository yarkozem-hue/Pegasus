Deploy to Fly.io (no public IP needed)
=====================================

This repository can be deployed to Fly.io which provides a stable `your-app.fly.dev` domain without needing a public IP or manual DNS/NAT.

Prep steps (on your machine)
1. Install `flyctl`:

```
curl -L https://fly.io/install.sh | sh
```

2. Login:

```
flyctl auth login
```

3. (Optional) Edit `fly.toml` to change `name = "pegasus"` to your preferred app name. The app will be available at `https://<name>.fly.dev`.

Create a persistent volume for `data` (recommended):

```
flyctl volumes create pegasus-data 1G --region lhr
```

Then add the mount to `fly.toml` under `mounts` or edit the generated `fly.toml` after `flyctl launch`.

Deploy

```
./deploy/fly-deploy.sh
```

Notes
- If you prefer I run the deploy from this environment, provide a Fly.io auth token (from `flyctl auth token`) and I can call `flyctl deploy` here — otherwise follow the steps locally.
- After deploy the public URL will be `https://<name>.fly.dev` and valid TLS will be provided automatically.
