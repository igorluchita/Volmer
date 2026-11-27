import Image from "next/image";
import Link from "next/link";
import { catalog, catalogPath } from "@/catalog/repository";
import { siteConfig } from "@/config/site";
import { filterProducts, formatPrice } from "@/catalog/query";
import { catalogMessages } from "@/catalog/messages";
import { catalogOrigin, catalogProductSchema, jsonLd } from "@/catalog/seo";
import type { CatalogLocale, CatalogQuestion, Category, Product } from "@/catalog/types";
import { ProductGrid } from "./product-grid";
import { ProductCard } from "./product-card";
import { ProductGallery } from "./product-gallery";
import { CatalogPhoto } from "./catalog-photo";
export function CatalogPage({
  locale,
  category,
  product,
}: {
  locale: CatalogLocale;
  category?: Category;
  product?: Product;
}) {
  const t = catalogMessages[locale];
  const crumbs = [
    { name: t.home, url: `/${locale}/` },
    { name: t.catalog, url: catalogPath(locale) },
    ...(category
      ? [
          {
            name: category.name[locale],
            url: catalogPath(locale, category.slug),
          },
        ]
      : []),
    ...(product && category
      ? [
          {
            name: product.name[locale],
            url: catalogPath(locale, category.slug, product.slug),
          },
        ]
      : []),
  ];
  const products = category
    ? catalog.products.filter((p) => p.categoryId === category.id)
    : catalog.products;
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${catalogOrigin}${catalogPath(locale, category?.slug, product?.slug)}#breadcrumbs`,
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${catalogOrigin}${c.url}`,
    })),
  };
  const itemList = products.length
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": `${catalogOrigin}${catalogPath(locale, category?.slug)}#products`,
        name: category?.name[locale] ?? t.title,
        numberOfItems: products.length,
        itemListElement: filterProducts(products, locale, {}).map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.name[locale],
          url: `${catalogOrigin}${catalogPath(locale, catalog.categories.find((c) => c.id === p.categoryId)!.slug, p.slug)}`,
        })),
      }
    : null;
  const productSchema =
    product && category
      ? catalogProductSchema(locale, category, product)
      : null;
  const pageUrl = `${catalogOrigin}${catalogPath(locale, category?.slug, product?.slug)}`;
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": product ? "WebPage" : "CollectionPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: product?.name[locale] ?? category?.name[locale] ?? t.title,
    description:
      product?.shortDescription[locale] ??
      category?.description[locale] ??
      t.intro,
    inLanguage: locale === "ro" ? "ro-MD" : "ru-MD",
    breadcrumb: { "@id": `${pageUrl}#breadcrumbs` },
    ...(productSchema
      ? { mainEntity: { "@id": productSchema["@id"] } }
      : !product && itemList
        ? { mainEntity: { "@id": `${pageUrl}#products` } }
        : {}),
  };
  const specificQuestions = product?.faq ??
    category?.faq ?? [
      {
        question: {
          ro: "Ce produse găsesc în catalogul Volmer?",
          ru: "Какие товары есть в каталоге Volmer?",
        },
        answer: {
          ro: "Catalogul cuprinde dopuri de urechi Alpine, baterii Volmer pentru aparate auditive, filtre anticerumen NanoCare, produse de uscare SCALA și olive auditive personalizate. Alegeți categoria după utilizare, apoi verificați caracteristicile produsului.",
          ru: "В каталоге представлены беруши Alpine, батарейки Volmer для слуховых аппаратов, серные фильтры NanoCare, средства для сушки SCALA и индивидуальные ушные вкладыши. Выберите категорию по назначению, затем проверьте характеристики товара.",
        },
      },
    ];
  const purchaseQuestion: CatalogQuestion = {
    question: {
      ro: product
        ? "Cum pot cumpăra acest produs în Moldova?"
        : "Cum verific prețul și disponibilitatea în Moldova?",
      ru: product
        ? "Как купить этот товар в Молдове?"
        : "Как узнать цену и наличие в Молдове?",
    },
    answer: {
      ro: `${product?.price ? `Prețul afișat este ${formatPrice(product.price, "ro")}. ` : product ? "Contactați pentru prețul individual. " : "Prețurile produselor sunt afișate în MDL; pentru olivele la comandă solicitați prețul individual. "}Pentru cumpărare, sunați Volmer la ${siteConfig.phoneDisplay} și confirmați disponibilitatea și compatibilitatea înainte de vizită. Ne găsiți pe ${siteConfig.address}, Chișinău.`,
      ru: `${product?.price ? `Указанная цена — ${formatPrice(product.price, "ru")}. ` : product ? "Уточните индивидуальную цену. " : "Цены товаров указаны в MDL; цену вкладышей на заказ уточняйте индивидуально. "}Для покупки позвоните в Volmer по номеру ${siteConfig.phoneDisplay} и подтвердите наличие и совместимость перед визитом. Адрес: ул. Митрополит Варлаам, 69, Кишинёв.`,
    },
  };
  return (
    <div className={`vc-catalog${product ? " vc-catalog--product" : category ? " vc-catalog--category" : ""}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(pageSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }}
      />
      {!product && itemList && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(itemList) }}
        />
      )}
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(productSchema) }}
        />
      )}
      <div className="vc-shell">
        <nav
          className="vc-breadcrumb"
          aria-label={
            locale === "ro" ? "Navigare ierarhică" : "Навигационная цепочка"
          }
        >
          <ol>
            {crumbs.map((c, i) => (
              <li key={c.url}>
                {i === crumbs.length - 1 ? (
                  <span aria-current="page">{c.name}</span>
                ) : (
                  <Link href={c.url}>{c.name}</Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {category && !product && <header className="vc-category-hero">
          <div className="vc-category-hero-copy">
            <p className="vc-category-eyebrow"><span className="vc-category-signal" aria-hidden="true" />{t.eyebrow}</p>
            <h1>{category.name[locale]}</h1>
            <p className="vc-category-hero-description">{category.description[locale]}</p>
            <p className="vc-category-hero-guide">{category.id === "hearing-batteries" ? t.categoryGuideBattery : category.id === "custom-earmolds" ? t.categoryGuideEarmold : t.categoryGuide}</p>
            <div className="vc-category-hero-actions"><a href="#products" className="vc-category-hero-button">{t.categoryExplore}<span aria-hidden="true">↘</span></a><span>{locale === "ro" ? `${products.length} ${products.length === 1 ? "produs" : "produse"} în această categorie` : `${products.length} ${products.length === 1 ? "товар" : products.length < 5 ? "товара" : "товаров"} в этой категории`}</span></div>
          </div>
          <div className="vc-category-hero-visual" aria-hidden="true">
            <div className="vc-category-hero-ring vc-category-hero-ring--one" />
            <div className="vc-category-hero-ring vc-category-hero-ring--two" />
            {category.image && <Image src={category.image.src} alt="" width={category.image.width} height={category.image.height} sizes="(max-width: 768px) 80vw, 35vw" priority />}
            <span className="vc-category-hero-index">VOLMER / 0{catalog.categories.findIndex((c) => c.id === category.id) + 1}</span>
          </div>
        </header>}
        {!product && !category && <header className="vc-hero">
          <div>
            <p className="vc-kicker">{t.eyebrow}</p>
            <h1>
              {t.title}
            </h1>
            <p className="vc-intro">
              {t.intro}
            </p>
          </div>
          <div className="vc-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
            <b>V</b>
          </div>
        </header>}
        {product && category ? (
          <>
            <section className="vc-product-detail" aria-labelledby="vc-product-title">
              <div className="vc-product-gallery-column">
                <Link className="vc-product-catalog-link" href={catalogPath(locale)}>{t.backToCatalog} <span aria-hidden="true">↗</span></Link>
                <ProductGallery images={product.images} locale={locale} label={t.gallery} noImage={t.noImage} />
              </div>
              <div className="vc-product-summary">
                <p className="vc-product-overline"><span>{t.eyebrow}</span><span className="vc-product-overline-line" /></p>
                {product.brand && <p className="vc-product-brand">{product.brand}{product.model && <span> / {product.model}</span>}</p>}
                <h1 id="vc-product-title">{product.name[locale]}</h1>
                <p className="vc-product-lead">{product.shortDescription[locale]}</p>
                <div className="vc-product-purchase">
                  <div className="vc-product-price-wrap">
                    <span className="vc-product-price-label">{t.priceLabel}</span>
                    <p className="vc-price">{formatPrice(product.price, locale) ?? product.priceOnRequest?.[locale] ?? t.unavailable}</p>
                  </div>
                  <p className="vc-product-purchase-terms">{t.purchaseTerms}</p>
                  <Link className="vc-product-cta" href={`tel:${siteConfig.phoneInternational}`}>
                    <span>{t.askProduct}</span><span className="vc-product-cta-icon" aria-hidden="true">↗</span>
                  </Link>
                  <Link className="vc-product-back" href={catalogPath(locale, category.slug)}>{t.backToCategory}: {category.name[locale]} <span aria-hidden="true">→</span></Link>
                </div>
              </div>
            </section>
            <div className="vc-product-content">
              <section className="vc-product-story" aria-labelledby="vc-product-details-title">
                <p className="vc-product-section-kicker">01 / {t.details}</p>
                <h2 id="vc-product-details-title">{locale === "ro" ? "Utilizare" : "Применение"}: {product.name[locale].split(/ [–—] /)[0]}</h2>
                <p className="vc-description">{product.description[locale]}</p>
              </section>
              {product.features.length > 0 && (
                <section className="vc-product-highlights" aria-labelledby="vc-product-features-title">
                  <p className="vc-product-section-kicker">02 / {t.features}</p>
                  <h2 id="vc-product-features-title">{t.features}</h2>
                  <ul>{product.features.map((f, i) => <li key={i}><span aria-hidden="true">✦</span>{f[locale]}</li>)}</ul>
                </section>
              )}
            </div>
            {product.specifications.length > 0 && (
              <section className="vc-specs">
                <p className="vc-product-section-kicker">03 / {t.specifications}</p>
                <h2>{t.specifications}</h2>
                <dl>
                  {product.specifications.map((s, i) => (
                    <div key={i}>
                      <dt>{s.label[locale]}</dt>
                      <dd>{s.value[locale]}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
            {!!product.documents?.length && (
              <section className="vc-documents">
                <h2>{t.documents}</h2>
                <ul>
                  {product.documents.map((d) => (
                    <li key={d.href}>
                      <a href={d.href}>{d.label[locale]} ↗</a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {catalog.related(product).length > 0 && (
              <section className="vc-related">
                <h2>{t.related}</h2>
                <div className="vc-grid">
                  {catalog.related(product).map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      category={catalog.categories.find(
                        (c) => c.id === p.categoryId,
                      )!}
                      locale={locale}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <>
            {!category && catalog.categories.length > 0 && (
              <section className="vc-categories">
                <div className="vc-section-heading">
                  <h2>{t.categories}</h2>
                </div>
                <div className="vc-grid">
                  {catalog.categories.map((c, index) => (
                    <article className="vc-category" key={c.id}>
                      <Link href={catalogPath(locale, c.slug)}>
                        {c.image && (
                          <CatalogPhoto
                            image={c.image}
                            alt={c.image.alt[locale]}
                            priority={index === 0}
                            sizes="(max-width:600px) 90vw, 30vw"
                          />
                        )}
                        <h3>
                          {c.name[locale]} <span aria-hidden="true">↗</span>
                        </h3>
                        <p>{c.description[locale]}</p>
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            )}
            {products.length > 0 ? (
              <ProductGrid
                products={products}
                categories={catalog.categories}
                locale={locale}
                categoryId={category?.id}
              />
            ) : (
              <section className="vc-empty">
                <div className="vc-empty-mark" aria-hidden="true">
                  ＋
                </div>
                <p className="vc-kicker">VOLMER</p>
                <h2>{t.emptyTitle}</h2>
                <p>{t.empty}</p>
                <a className="vc-button" href={`/${locale}/#booking-form`}>
                  {t.ask}
                  <span aria-hidden="true">↗</span>
                </a>
              </section>
            )}
          </>
        )}
        <section className="vc-specs" aria-labelledby="vc-faq-title">
          <h2 id="vc-faq-title">{locale === "ro" ? "Întrebări frecvente" : "Частые вопросы"}</h2>
          <dl>{[...specificQuestions, purchaseQuestion].map((item) => <div key={item.question[locale]}><dt>{item.question[locale]}</dt><dd>{item.answer[locale]}</dd></div>)}</dl>
        </section>
      </div>
    </div>
  );
}
