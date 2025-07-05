<pre>
 __  __                                  ____    ___  
|  \/  | ___  ___ ___ __ _ _ __   ___   |___ \  / _ \ 
| |\/| |/ _ \/ __/ __/ _` | '_ \ / _ \    __) || | | |
| |  | |  __/ (_| (_| (_| | | | | (_) |  / __/ | |_| |
|_|  |_|\___|\___\___\__,_|_| |_|\___/  |_____(_)___/
</pre>

# Meccano Builder 2.0 :v:
Для работы с html используется [posthtml](https://posthtml.org/).

Рекомендуется ознакомится с [posthtml-components](https://github.com/posthtml/posthtml-components)

При написании путей к ресурсам(например картинки, стили, шрифты и тд) стоит указывать с `/` в начале пути и отностительно **директории src**. Для подсказок стоит использовать [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense). При чём не важно указываетe вы путь в `.html` или в `.styl` файлах.

Пример:
```html
<link rel="stylesheet" href="/src/styles/main.styl" />
```

В конечной сборке пути автоматически будут переписаны на относительный путь к директории dest.

В директории `/src/styles` имена файлов могут начинаться с нижнего подчеркивания (`_`). Это означает, что файл рассматривается как импортируемый и **НЕ** будет скопирован напрямую в директорию dest. Остальные файлы будут транспилированы в CSS и сохранены в dest.

При запуске команды `npm run prod` по мимо dest так же будет сгенерирован zip архив с текущей датой в названии и сохранён в директорию `build`.

Так же есть команда `npm run fonts`(экспериментально). Она сканирует `src/fonts` и если там шрифты в формате `.ttf` - конвертирует их в `.woff` и `woff2`. Затем обновляет файл `src/styles/_fonts.styl` - прописывает туда все пути к шрифтам.

Для корректной работы автоисправления необходимо добавить в конфиг vscode:
```json
{
  "[html]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  "[stylus]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "thisismanta.stylus-supremacy"
  },

  "stylusSupremacy.insertBraces": false,
  "stylusSupremacy.insertColons": false,
  "stylusSupremacy.selectorSeparator": ",\n",
  "stylusSupremacy.reduceMarginAndPaddingValues": true,
  "stylusSupremacy.insertSpaceBeforeComment": true,
  "stylusSupremacy.insertSpaceAfterComment": false,
  "stylusSupremacy.insertSemicolons": false,
  "stylusSupremacy.insertNewLineAroundBlocks": true,

  "files.insertFinalNewline": true,

  "html.customData": ["./html.html-data.json"]
}
```

## Рекомендуемое окружение
NodeJS - v22.16.0

npm - 10.9.2

## Установить зависимости
```bash
$ npm install
```

## Запуск в режиме dev
```bash
$ npm run dev
```

## Сборка проекта в режиме prod
```bash
$ npm run prod
```

При выполнении данной команды происходит следующее:

* Создаётся папка **build**, содержащая архив приложения, собранного в режиме production;
* Формируется папка **dest** — готовая для развёртывания директория с собранным приложением;
* Сборка также копируется в директорию **history** для хранения истории релизов;

## Запуск собранного проекта в режиме prod
```bash
$ npm run serve
```

## Создание нового компонента
```bash
$ npm run add
```

## Конвертация шрифтов(beta)
```bash
$ npm run fonts
```

## Рекомендованные расширения для VS Code:
* [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
* [PostHTML Snippets](https://marketplace.visualstudio.com/items?itemName=cossssmin.posthtml)
* [Stylus Supremacy](https://marketplace.visualstudio.com/items?itemName=thisismanta.stylus-supremacy)
