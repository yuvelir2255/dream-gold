# Dream Gold — сайт-вітрина ювелірного бренду

Преміум-сайт авторського ювелірного бренду **Dream Gold** (Україна): вітрина виробів + індивідуальні замовлення. Модель — «вітрина + заявка», **без онлайн-оплати і без цін на сайті**. Контент — українською, звертання до клієнта на «ви». Ціль — рівень Awwwards.

## Стек

- **Next.js 16** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS v4** + **shadcn/ui** (Radix) + **Lucide**
- Анімація: **GSAP** (+ `@gsap/react`) + **Lenis** (smooth scroll)
- 3D точково: **react-three-fiber** + `drei` + `postprocessing`
- Backend/CMS (план): **Payload v3** + **Postgres**
- Деплой: **Vercel** (пізніше)

## Команди

```bash
npm run dev        # дев-сервер (Turbopack) → http://localhost:3000
npm run build      # прод-збірка
npm run lint       # ESLint
npx tsc --noEmit   # перевірка типів
```

## Структура

```
app/                 App Router: layout, globals.css (дизайн-токени), page.tsx (головна)
components/
  layout/            header, footer, smooth-scroll (Lenis + GSAP)
  sections/          секції головної: manifesto, individual, works …
  brand/             логотип (CSS-mask, currentColor)
public/images/       зображення (hero, галерея works)
assets/products/     вихідні референси виробів (не публікуються)
```

## Дизайн-система

Токени в `app/globals.css`: палітра (`ivory` / `cream` / `sand` / `ink` / `gold` …), шрифти **Playfair Display** (заголовки) + **Manrope** (текст) — обидва з кирилицею, флюїдна типошкала, motion-токени. Темні секції — обгортка `.dark` (теплий графіт).

## Статус

Головна (зверху вниз): **hero → маніфест → індивідуальне виготовлення → вибрані роботи → footer**.
Далі: обручки та заручини, майстерність, шоурум, відгуки, форма заявки; прелоадер (3D); бекенд (Payload + кабінет).

## Конвенції

TypeScript strict (без `any`); a11y та `prefers-reduced-motion` на важких анімаціях; мобайл — пріоритет (LCP < 1.5s, CLS < 0.05, INP < 100ms); секрети тільки в `.env*`; код — у стилі оточення.
