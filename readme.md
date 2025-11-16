# Sample Entra ID Angular + ASP.NET Web API Project

This repository contains a sample Angular (v20) SPA integrated with an ASP.NET Web API (v8), secured using **Microsoft Entra External ID**. The project demonstrates authentication and API access configuration using MSAL and JwtBearer authentication.

> ⚠️ **Note:** This project is intended **only for demonstration and development purposes**. It is **not suitable for production environments**.

---

---

## Prerequisites

Before you start, make sure you have the following:

1. [VS Code](https://code.visualstudio.com/) IDE (or another code editor)
2. [Node.js & npm](https://nodejs.org/) installed for Angular
3. [.NET SDK](https://dotnet.microsoft.com/download) installed for ASP.NET Web API
4. An **Azure Free Tier Account**
5. An **Entra ID (Azure AD) external tenant** with two app registrations configured:
   - SPA Angular UI
   - ASP.NET Web API
6. [Angular CLI](https://angular.io/cli) installed globally:
   ```bash
   npm install -g @angular/cli
   ```
7. Git installed for cloning the repository

---

## Instructions

### 1. Clone the repository

```bash
git clone https://github.com/dwalterskoetter/sample-entra-angular-aspnet.git
```

### 2. Install dependencies

#### Backend (ASP.NET Web API)

```bash
cd API/MyApi
dotnet restore
```

#### Frontend (Angular UI)

```bash
cd ../../UI/angular-ui
npm install
```

### 3. Configure API (`appsettings.json`)

Add your Entra ID / Azure AD information:

```json
"AzureAd": {
  "Instance": "https://YOUR_TENANT_DOMAIN.ciamlogin.com",
  "TenantId": "YOUR_TENANT_ID",
  "ClientId": "YOUR_CLIENT_ID",
  "Domain": "YOUR_TENANT_DOMAIN.onmicrosoft.com"
}
```

### 4. Configure UI (`app.config.ts`)

Add your MSAL configuration:

```ts
const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID",
    authority: "https://YOUR_TENANT_DOMAIN.ciamlogin.com/",
    redirectUri: "http://localhost:4200",
    postLogoutRedirectUri: "http://localhost:4200",
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
  },
};

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map<string, Array<string> | null>([
      ["http://localhost:5074/*", ["api://YOUR_CLIENT_ID/access_as_user"]],
    ]),
  };
}
```

### 5. Run the application

#### API (Backend)

```bash
cd API/MyApi
dotnet run
```

#### UI (Frontend)

```bash
cd ../../UI/angular-ui
ng serve
```

### 6. Open the app

- Open your browser and navigate to [http://localhost:4200](http://localhost:4200)
- You should be able to authenticate via Entra ID and call the API securely.

---

### Notes

- Ensure your API and UI app registrations are correctly configured in your Entra ID tenant.
- For production deployment, update CORS policies and redirect URIs accordingly.

---

### License

This project is released under the MIT License.
