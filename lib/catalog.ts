/**
 * Single source of truth for the catalogue — used by /catalog, the product
 * pages, and the home teaser. No prices (inquiry model), no brand names
 * (authorial positioning). Images are the AI stills in public/images/works.
 * When the Payload backend lands (Этап C) this shape maps onto the `products`
 * collection and the array is swapped for a query.
 */

// Only categories that have pieces today. Підвіски / Ланцюжки / Обручки return
// here the moment their stills land (gated on the imagery pipeline) — keeping
// empty categories out avoids dead filter chips and dangling union members.
export type Category = "Каблучки" | "Сережки" | "Браслети" | "Кольє";

/** Canonical display order for category chips / sections. */
export const CATEGORY_ORDER: Category[] = [
  "Каблучки",
  "Сережки",
  "Браслети",
  "Кольє",
];

export type ProductDetail = { label: string; value: string };

export type Product = {
  slug: string;
  title: string;
  category: Category;
  /** Path under /public. */
  image: string;
  alt: string;
  /** One-line lede shown on the product page. */
  summary: string;
  /** Spec slots — refined later by the client. */
  details: ProductDetail[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "persten-zhovte-zoloto",
    title: "Перстень, жовте золото",
    category: "Каблучки",
    image: "/images/works/ring.jpg",
    alt: "Золотий перстень ручної роботи Dream Gold на теплому мармурі",
    summary:
      "Масивний перстень із жовтого золота з рельєфним пірамідальним обідком — графічна форма, що однаково доречна щодня та для особливих виходів.",
    details: [
      { label: "Метал", value: "Жовте золото" },
      { label: "Проба", value: "585 / 750" },
      { label: "Оздоблення", value: "Поліровка, ручне доведення" },
      { label: "Виготовлення", value: "2–4 тижні" },
    ],
  },
  {
    slug: "serezhky-puseti-diamant",
    title: "Сережки-пусети з діамантом",
    category: "Сережки",
    image: "/images/works/studs.jpg",
    alt: "Сережки-пусети з діамантом у класичній закріпці на моделі",
    summary:
      "Класичні пусети-солітери з діамантом у лаконічній закріпці — щоденна елегантність, що пасує до будь-якого образу.",
    details: [
      { label: "Метал", value: "Біле або жовте золото" },
      { label: "Проба", value: "585" },
      { label: "Каміння", value: "Діамант із сертифікатом" },
      { label: "Виготовлення", value: "2–4 тижні" },
    ],
  },
  {
    slug: "serezhky-zoloto-diamanty",
    title: "Сережки, золото з діамантами",
    category: "Сережки",
    image: "/images/works/hoops.jpg",
    alt: "Золоті сережки з діамантами на тлі травертину",
    summary:
      "Обʼємні сережки з золота з діамантовим паве — виразний акцент, що грає світлом на кожній грані.",
    details: [
      { label: "Метал", value: "Жовте золото" },
      { label: "Проба", value: "585 / 750" },
      { label: "Каміння", value: "Діаманти, паве" },
      { label: "Виготовлення", value: "2–4 тижні" },
    ],
  },
  {
    slug: "braslet-bile-zoloto",
    title: "Браслет, біле золото",
    category: "Браслети",
    image: "/images/works/bangle.jpg",
    alt: "Браслет із білого золота з діамантами на зап'ясті моделі",
    summary:
      "Жорсткий браслет із білого золота з діамантовою доріжкою — мінімалістична лінія, що сідає за формою зап'ястя.",
    details: [
      { label: "Метал", value: "Біле золото" },
      { label: "Проба", value: "585 / 750" },
      { label: "Каміння", value: "Діаманти, доріжка" },
      { label: "Виготовлення", value: "2–4 тижні" },
    ],
  },
  {
    slug: "braslet-perlamutr",
    title: "Браслет із перламутром",
    category: "Браслети",
    image: "/images/works/bracelet.jpg",
    alt: "Браслет із білого золота та перламутру на шовку",
    summary:
      "Браслет із білого золота з перламутровими ланками — мʼяке сяйво перламутру в обрамленні діамантів.",
    details: [
      { label: "Метал", value: "Біле золото" },
      { label: "Проба", value: "585" },
      { label: "Каміння", value: "Перламутр, діаманти" },
      { label: "Виготовлення", value: "2–4 тижні" },
    ],
  },
  {
    slug: "kolye-perlamutr",
    title: "Кольє з перламутром",
    category: "Кольє",
    image: "/images/works/necklace.jpg",
    alt: "Золоте кольє з перламутровим підвісом на декольте моделі",
    summary:
      "Кольє з підвісом із перламутру в золотому обрамленні — тонка лінія ланцюжка та світлий акцент на декольте.",
    details: [
      { label: "Метал", value: "Жовте золото" },
      { label: "Проба", value: "585" },
      { label: "Каміння", value: "Перламутр" },
      { label: "Виготовлення", value: "2–4 тижні" },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** Other pieces for the “Інші роботи” strip on a product page. */
export function getRelatedProducts(slug: string, count = 3): Product[] {
  return PRODUCTS.filter((p) => p.slug !== slug).slice(0, count);
}

/** Categories that actually have products, in canonical order (for filter chips). */
export function getCategoriesWithProducts(): Category[] {
  return CATEGORY_ORDER.filter((c) => PRODUCTS.some((p) => p.category === c));
}
