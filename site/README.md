# BeautyWorld
Салчак Максим

[![Netlify Status](https://api.netlify.com/api/v1/badges/a4538f1d-daba-4886-b0c3-364ff7830aaf/deploy-status)](https://app.netlify.com/sites/beautyworld-max/deploys)

## Старт
#### `npm i` – установить зависимости проекта
#### `npm start` - запустить сборщик в режиме dev
#### `npm run build` - собрать проект

### Структура проекта

```
├── dist/                            # Папка с билдом проекта
├── src/                             # Папка с исходниками проекта
│   ├── css                          # Минифицированные стили проекта
│   ├── fonts                        # Шрифты используемые в проекте
│   ├── images/                      # Папка с картинками, иконками
│   ├── sass/                        # Папка со стилями в синтаксисе scss
│   └── index.html                   # Индексный файл разметки
├── .gitignore                       # Список исключённых файлов из Git
├── gulpfile.js                      # Конфигурация таск-ранера Gulp
├── package-lock.json                # Служебный файл
├── package.json                     # Файл манифеста - список модулей и прочей информации
└── README.md                        # Документация шаблона
```