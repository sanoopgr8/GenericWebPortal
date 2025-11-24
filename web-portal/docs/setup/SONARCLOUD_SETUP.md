# SonarCloud Setup Guide

## Overview

This project is configured to use **SonarCloud** (not self-hosted SonarQube) for static code analysis. SonarCloud is a cloud-based code quality and security service.

## Configuration

### Project Details
- **Organization**: `sanoopgr8`
- **Project Key**: `sanoopgr8_GenericWebPortal`
- **Project Name**: `GenericWebPortal`
- **SonarCloud URL**: `https://sonarcloud.io`

### Configuration Files

1. **`pom.xml`** - Contains SonarCloud properties for Maven
2. **`sonar-project.properties`** - Contains project-level configuration
3. **`.github/workflows/sonarqube.yml`** - GitHub Actions workflow

## Setup Steps

### 1. Create SonarCloud Project

1. Go to [https://sonarcloud.io](https://sonarcloud.io)
2. Sign in with your GitHub account
3. Click **"+"** → **"Analyze new project"**
4. Select your repository: `webportal`
5. Set up the project:
   - **Organization**: `sanoopgr8` (should be pre-selected)
   - **Project Key**: `sanoopgr8_GenericWebPortal`
   - **Display Name**: `GenericWebPortal`

### 2. Generate SonarCloud Token

1. In SonarCloud, click on your avatar (top-right)
2. Go to **My Account** → **Security**
3. Under **Generate Tokens**:
   - **Name**: `GitHub Actions - webportal`
   - **Type**: `User Token` or `Project Analysis Token`
   - **Expires in**: Choose appropriate duration
4. Click **Generate**
5. **Copy the token** (you won't be able to see it again!)

### 3. Configure GitHub Secret

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the secret:
   - **Name**: `SONAR_TOKEN`
   - **Value**: Paste the token from step 2
5. Click **Add secret**

### 4. Verify Configuration

The configuration is already set up in the repository:

**pom.xml** (backend):
```xml
<properties>
  <sonar.organization>sanoopgr8</sonar.organization>
  <sonar.host.url>https://sonarcloud.io</sonar.host.url>
  <sonar.projectKey>sanoopgr8_GenericWebPortal</sonar.projectKey>
  <sonar.projectName>GenericWebPortal</sonar.projectName>
</properties>
```

**sonar-project.properties** (root):
```properties
sonar.organization=sanoopgr8
sonar.projectKey=sanoopgr8_GenericWebPortal
sonar.projectName=GenericWebPortal
```

## Running Analysis

### Automatic (GitHub Actions)

The analysis runs automatically on:
- Push to `main`, `develop`, or `feature_*` branches
- Pull requests to `main` or `develop`
- Manual trigger via GitHub Actions UI

### Manual (Local)

#### Using Maven (Backend only):
```bash
cd web-portal/backend
mvn clean verify sonar:sonar -Dsonar.token=YOUR_SONAR_TOKEN
```

#### Using SonarScanner CLI (Full project):
```bash
sonar-scanner -Dsonar.token=YOUR_SONAR_TOKEN
```

## Viewing Results

1. Go to [https://sonarcloud.io](https://sonarcloud.io)
2. Navigate to your organization: `sanoopgr8`
3. Click on the project: `WebPortal`
4. View:
   - **Overview**: Summary of issues and coverage
   - **Issues**: Detailed list of bugs, vulnerabilities, and code smells
   - **Security Hotspots**: Code requiring security review
   - **Measures**: Metrics and trends
   - **Code**: Browse code with inline annotations

## GitHub Integration

SonarCloud will automatically:
- ✅ Decorate pull requests with analysis results
- ✅ Show quality gate status in PR checks
- ✅ Comment on PRs with new issues
- ✅ Update commit status

## Quality Gate

The default quality gate checks:
- New code has no bugs
- New code has no vulnerabilities
- New code has no code smells rated A
- Coverage on new code is at least 80%
- Duplication on new code is less than 3%

You can customize the quality gate in SonarCloud:
1. Go to **Quality Gates** in SonarCloud
2. Create a custom gate or modify the default
3. Assign it to your project

## Troubleshooting

### Analysis Fails with Authentication Error

**Problem**: `SONAR_TOKEN` is not set or is invalid

**Solution**:
1. Verify the secret exists in GitHub (Settings → Secrets → Actions)
2. Generate a new token in SonarCloud
3. Update the GitHub secret

### Project Not Found

**Problem**: Project doesn't exist in SonarCloud

**Solution**:
1. Create the project in SonarCloud first
2. Ensure the project key matches: `sanoopgr8_webportal`
3. Ensure the organization matches: `sanoopgr8`

### Wrong Organization

**Problem**: Token is for a different organization

**Solution**:
1. Verify you're using the correct organization: `sanoopgr8`
2. Generate a token from the correct organization
3. Update the GitHub secret

## Benefits of SonarCloud

✅ **Free for public repositories**
✅ **No server maintenance required**
✅ **Automatic updates**
✅ **GitHub integration out of the box**
✅ **Unlimited analysis**
✅ **PR decoration**
✅ **Quality gate enforcement**

## Links

- **SonarCloud Dashboard**: https://sonarcloud.io/organizations/sanoopgr8
- **Project URL**: https://sonarcloud.io/project/overview?id=sanoopgr8_webportal
- **Documentation**: https://docs.sonarcloud.io/
- **Token Management**: https://sonarcloud.io/account/security

## Support

- **SonarCloud Docs**: https://docs.sonarcloud.io/
- **Community Forum**: https://community.sonarsource.com/
- **GitHub Issues**: Report issues in this repository

---

**Status**: ✅ Configured for SonarCloud
**Organization**: sanoopgr8
**Project**: WebPortal (sanoopgr8_webportal)
