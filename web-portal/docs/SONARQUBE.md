# SonarQube Setup and Configuration Guide

This document provides instructions for setting up and using SonarQube static code analysis for the Web Portal project.

## Overview

The SonarQube workflow analyzes both the **Java Spring Boot backend** and the **React frontend** to identify:
- Code smells
- Bugs and vulnerabilities
- Security hotspots
- Code coverage gaps
- Code duplication
- Maintainability issues

## Prerequisites

1. **SonarQube Server**: You need access to a SonarQube server (self-hosted or SonarCloud)
2. **GitHub Secrets**: Configure the following secrets in your GitHub repository

## GitHub Secrets Configuration

Navigate to your GitHub repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add the following secrets:

### 1. SONAR_TOKEN
- **Description**: Authentication token for SonarQube
- **How to generate**:
  1. Log in to your SonarQube instance
  2. Click on your avatar (top-right) → **My Account**
  3. Go to **Security** tab
  4. Generate a new token with a descriptive name (e.g., "GitHub Actions")
  5. Copy the token and add it to GitHub secrets

### 2. SONAR_HOST_URL
- **Description**: URL of your SonarQube server
- **Examples**:
  - Self-hosted: `https://sonarqube.yourcompany.com`
  - SonarCloud: `https://sonarcloud.io`

## Project Configuration

### SonarQube Project Setup

1. **Create a new project** in SonarQube:
   - Project Key: `web-portal`
   - Project Name: `Web Portal`

2. **Configure Quality Gate** (optional):
   - Set custom quality gate rules
   - Configure coverage thresholds
   - Define acceptable technical debt

### Local Analysis (Optional)

You can run SonarQube analysis locally before pushing:

#### Using Maven (Backend only)
```bash
cd web-portal/backend
mvn clean verify sonar:sonar \
  -Dsonar.projectKey=web-portal \
  -Dsonar.host.url=YOUR_SONARQUBE_URL \
  -Dsonar.login=YOUR_SONAR_TOKEN
```

#### Using SonarScanner CLI (Full project)
```bash
# Install SonarScanner CLI
# Download from: https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/

# Run analysis
sonar-scanner \
  -Dsonar.host.url=YOUR_SONARQUBE_URL \
  -Dsonar.login=YOUR_SONAR_TOKEN
```

## Workflow Triggers

The SonarQube analysis workflow runs automatically on:

1. **Push to branches**:
   - `main`
   - `develop`
   - Any branch starting with `feature_`

2. **Pull Requests** targeting:
   - `main`
   - `develop`

3. **Manual trigger**: Via GitHub Actions UI (workflow_dispatch)

## Analysis Configuration

### What Gets Analyzed

**Backend (Java)**:
- Source: `web-portal/backend/src/main/java`
- Tests: `web-portal/backend/src/test/java`
- Java Version: 17

**Frontend (React)**:
- Source: `web-portal/frontend/src`
- JavaScript/JSX files

### Exclusions

The following are excluded from analysis:
- `node_modules/`
- `target/`
- `dist/` and `build/`
- Test files (`*.test.js`, `*.test.jsx`)
- Configuration files (`vite.config.js`, `eslint.config.js`)

## Quality Gate

The workflow includes a Quality Gate check that:
- Validates code quality against defined thresholds
- Reports status in the workflow run
- Can be configured to fail the build if quality gate fails

### Customizing Quality Gate Behavior

To make the build fail on Quality Gate failure, modify `.github/workflows/sonarqube.yml`:

```yaml
- name: SonarQube Quality Gate check
  uses: SonarSource/sonarqube-quality-gate-action@v1.1.0
  env:
    SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
    SONAR_HOST_URL: ${{ secrets.SONAR_HOST_URL }}
  # Remove or set to false to fail the build
  continue-on-error: false
```

## Viewing Results

1. **GitHub Actions**: Check the workflow run for summary
2. **SonarQube Dashboard**: 
   - Navigate to your SonarQube server
   - Find the "Web Portal" project
   - View detailed analysis results

## Code Coverage

### Backend (Java)
To enable code coverage for the backend:

1. Add JaCoCo plugin to `pom.xml`:
```xml
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.11</version>
    <executions>
        <execution>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>verify</phase>
            <goals>
                <goal>report</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

2. Update workflow to include coverage path:
```yaml
-Dsonar.coverage.jacoco.xmlReportPaths=web-portal/backend/target/site/jacoco/jacoco.xml
```

### Frontend (React)
To enable code coverage for the frontend:

1. Add test coverage script to `package.json`:
```json
"scripts": {
  "test:coverage": "vitest run --coverage"
}
```

2. Install coverage plugin:
```bash
npm install --save-dev @vitest/coverage-v8
```

3. The workflow already includes the LCOV report path

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Verify `SONAR_TOKEN` is correctly set in GitHub secrets
   - Ensure token hasn't expired

2. **Project Not Found**
   - Create the project in SonarQube first
   - Verify `sonar.projectKey` matches

3. **Analysis Timeout**
   - Large projects may need more time
   - Increase timeout in workflow if needed

4. **Coverage Not Showing**
   - Ensure tests are running before analysis
   - Verify coverage report paths are correct

## Best Practices

1. **Fix issues early**: Address SonarQube findings in feature branches
2. **Monitor trends**: Track code quality metrics over time
3. **Set realistic gates**: Configure quality gates that match your team's standards
4. **Review regularly**: Make SonarQube review part of your PR process
5. **Educate team**: Ensure developers understand SonarQube findings

## Additional Resources

- [SonarQube Documentation](https://docs.sonarqube.org/)
- [SonarQube Java Analysis](https://docs.sonarqube.org/latest/analysis/languages/java/)
- [SonarQube JavaScript Analysis](https://docs.sonarqube.org/latest/analysis/languages/javascript/)
- [GitHub Actions Integration](https://docs.sonarqube.org/latest/analysis/github-integration/)

## Support

For issues or questions:
1. Check SonarQube logs in GitHub Actions
2. Review SonarQube server logs
3. Consult [SonarSource Community](https://community.sonarsource.com/)
