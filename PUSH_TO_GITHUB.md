# Push to GitHub Instructions

Follow these steps to push your code to GitHub:

## Step 1: Open Terminal/Command Prompt

Navigate to your project directory:
```bash
cd c:\Users\Acer\SIH\siih-farm
```

## Step 2: Initialize Git (if not already done)

```bash
git init
```

## Step 3: Add Remote Repository

```bash
git remote add origin https://github.com/Kasim2908/siih-farm.git
```

If remote already exists, update it:
```bash
git remote set-url origin https://github.com/Kasim2908/siih-farm.git
```

## Step 4: Add All Files

```bash
git add .
```

## Step 5: Commit Changes

```bash
git commit -m "Initial commit: SIIH-FARM platform with AI crop recommendations"
```

## Step 6: Push to GitHub

```bash
git push -u origin main
```

If you get an error about branch name, try:
```bash
git branch -M main
git push -u origin main
```

## Step 7: Enter GitHub Credentials

When prompted, enter your GitHub username and password (or personal access token).

---

## Alternative: Using GitHub Desktop

1. Open GitHub Desktop
2. File → Add Local Repository
3. Select: `c:\Users\Acer\SIH\siih-farm`
4. Click "Publish repository"
5. Enter repository name: `siih-farm`
6. Click "Publish Repository"

---

## Troubleshooting

**Error: "remote origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/Kasim2908/siih-farm.git
```

**Error: "failed to push some refs"**
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

**Error: "authentication failed"**
- Use Personal Access Token instead of password
- Generate token at: https://github.com/settings/tokens

---

## Verify Upload

After pushing, visit:
https://github.com/Kasim2908/siih-farm

You should see all your files uploaded!
