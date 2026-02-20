# İçerik Yönetimi

Bu projede tüm veriler runtime'da JSON dosyasından okunur:

- `public/data/portfolio.json`

Bu dosyayı güncellediğinde sayfa yeni veriyi fetch eder; kod tarafında yeniden build alman gerekmez.

## Veri Alanları

- `personalInfo`
- `projectFilters`
- `projects`
- `experience`
- `education`
- `skills`
- `languages`

## Öne Çıkan Proje

Ana sayfadaki "Öne Çıkan Proje" alanı `projects` dizisinden gelir.
`featured: true` olan ilk proje gösterilir.

## Not

TypeScript tipleri için:

- `types/portfolio.ts`
