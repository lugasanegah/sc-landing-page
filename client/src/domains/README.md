# Domain-Driven Design Structure

Proyek ini menggunakan pendekatan Domain-Driven Design (DDD) untuk mengorganisir kode berdasarkan domain bisnis.

## Struktur Folder

```
client/src/domains/
├── shared/           # Komponen, utils, dan services yang digunakan bersama
│   ├── components/   
│   │   └── ui/      # UI components dari shadcn/ui
│   ├── hooks/       # Custom hooks yang shared
│   ├── lib/         # Utilities dan configurations
│   └── services/    # Services yang digunakan bersama
├── landing/         # Domain untuk landing page
│   ├── components/  # Komponen spesifik landing page
│   ├── hooks/       # Hooks spesifik landing
│   └── services/    # Services spesifik landing
├── pricing/         # Domain untuk pricing dan billing
│   ├── components/  # Komponen spesifik pricing
│   ├── hooks/       # Hooks spesifik pricing
│   └── services/    # Services spesifik pricing
└── auth/           # Domain untuk authentication
    ├── components/  # Komponen spesifik auth
    ├── hooks/       # Hooks spesifik auth
    └── services/    # Services spesifik auth
```

## Server Structure

```
server/domains/
├── shared/
│   ├── repositories/  # Data access layer
│   ├── services/      # Business logic shared
│   └── types/         # Shared type definitions
├── auth/
│   ├── controllers/   # Auth route handlers
│   ├── services/      # Auth business logic
│   └── types/         # Auth type definitions
└── pricing/
    ├── controllers/   # Pricing route handlers
    ├── services/      # Pricing business logic
    └── types/         # Pricing type definitions
```

## Keuntungan DDD Structure

1. **Separation of Concerns**: Setiap domain memiliki tanggung jawab yang jelas
2. **Scalability**: Mudah menambah fitur baru tanpa mengganggu domain lain
3. **Maintainability**: Kode lebih mudah dipelihara dan di-debug
4. **Team Collaboration**: Tim dapat bekerja pada domain berbeda secara parallel
5. **Reusability**: Komponen shared dapat digunakan ulang di berbagai domain