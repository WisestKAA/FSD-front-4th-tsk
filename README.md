# FSD-front-4th-tsk

### Выполнено для FSD Frontend 4 step education

## [Demo](https://wisestkaa.github.io/FSD-front-4th-tsk)
---

## Развертывание

Установка
>npm i

Запуск сервера webpack
>npm start

Запуск тестов
>npm test

Собрать дистрибутив плагина
>npm run buildplugin

Запустить Eslint по файлам проекта
>npm run eslint

---

# Архитектура приложения

## Описание архитектуры приложения
Плагин реализован в соответствии с паттерном «Model View Presenter»(далее — MVP) с пассивным View.
Уровень Presenter
Уровень Presenter является  входной точкой. Уровень  Presenter реализуется одноименным классом и интерфейсом IPresenter. С помощью данного уровня происходит взаимодействие между уровнями  View и  Model. Уровни  View и  Model между собой не взаимодействуют.  Манипуляция уровнями  View и  Model осуществляются с помощью функций интерфейсов IView и IModel соответственно. При изменении уровня Model генерируется соответствующее событие, на которое подписан  Presenter, после чего данные при необходимости обрабатываются и передаются во  View. При изменении уровня View, View вызывает соответствующий метод интерфейса IPresenter, после чего происходит соответствующее изменение уровня Model.
Уровень Model
Задачей уровня  Model является хранение и обработка данных слайдера. Входной точкой является одноименный класс, реализующий интерфейс IModel. Класс Model реализует паттерн «Фасад» и осуществляет взаимодействие между уровнем Presenter и классом SliderOptions, используемый для хранения и обработки данных.
Уровень View
Уровень View отвечает за отображение слайдера. Входной точкой является одноименный класс, реализующий интерфейс IView. Класс View реализует паттерн «Фасад». Уровень View разделен на три модуля — CurrentValueWrapper, SliderMainWrapper и ScaleWrapper. 
Модуль  CurrentValueWrapper отвечает за отображение текущего значения над бегунком слайдера. За реализацию отображения текущего значения отвечает класс CurrentValue.
Модуль  ScaleWrapper отвечает за отображение шкалы значений слайдера. За реализацию каждого значения шкалы отвечает класс ScaleItem.
Модуль  SliderMainWrapper отвечает за отображение линии слайдера, линии прогресса и  бегунка(ов) слайдера. За реализацию линии слайдера отвечает класс SliderLine.  За реализацию  линии прогресса отвечает класс SliderRange. За отображение  бегунка(ов) слайдера отвечает модуль SliderHandleWrapper. За реализацию бегунков слайдера отвечает класс SliderHandle.

## Внедрение зависимостей
В приложении используется два типа внедрения зависимости — с использованием «фабрик» и внедрение зависимостей через конструкторы. Инициализация фабрик происходит перед инициализацией класса Presenter и во время инициализации класса Presenter.
Каждый класс приложения реализует соответствующий интерфейс, что обеспечивает взаимодействие между компонентами без учета реализации самих компонентов.

## Передача данных снизу-вверх по слоям приложения
На уровне View модули нижнего уровня генерируют события, на которые подписаны модули верхнего уровня. После возникновения события подписанный модуль верхнего уровня  обрабатывает полученные данные, при необходимости запрашивает от поставщика дополнительные данные, обрабатывает их и либо передает необходимые данные от модуля верхнего уровня модулю нижнего уровня через функции его интерфейса, либо генерирует соответствующее событие для вышестоящего уровня. Таким образом данные доходят до класса View, который передает необходимую информацию на уровень Presenter через функции его интерфейса IPresenter. 
На уровне Presenter данные передаются с использованием функций интерфейсов IView и IModel. 
На уровне Model данные от класса Model передаются классу SliderOptions посредством интерфейса ISliderOptions, после изменения соответствующих значений класс Model генерирует соответствующее значение, на которое подписан экземпляр класса Presenter. Экземпляр класса Presenter после обнаружения соответствующего события реагирует на него изменением уровня View по необходимости посредством функций интерфейса IView.

## Описание компонентов 
Наименование                        | Описание
------------------------------------|------------------------------------
Presenter                           | Класс из состава паттерна MVP. Осуществляет взаимодействие между моделью и представлением. Является точкой входа
IPresenter                          | Интерфейс Presenter'a
Model                               | Класс из состава паттерна MVP. Реализует паттерн “Фасад”. Осуществляет обработку и хранение данных для сайдера.
ModelFactory                        | Класс реализует паттерн “Фабричный метод” для моедли
ISliderSettings                     | Интерфейс входных данных слайдера
IModel                              | Интерфейс модели
SliderOptions                       | Класс реализующий обработку и хранение данных для слайдера
SliderOptionsFactory                | Класс реализует паттерн “Фабричный метод” для SliderOptions
ISliderOptions                      | Интерфейс обработки и хранение данных для слайдера
View                                | Класс из состава паттерна MVP. Реализует паттерн “Фасад”. Отвечает за уровень представления и осуществляет взаимодействие между компонентами представления и уровнем Presenter
IView                               | Интефейс представления
ViewFactory                         | Класс реализует паттерн “Фабричный метод” для вида
IViewOptions                        | Интерфейс опций вида
ElementsFactory                     | Класс реализует паттерн “Фабричный метод” для элементов уровня представления
StyleClasses                        | Перечисление классов стилей элементов
SliderDirection                     | Класс предназначеный для хранения статистических значений направления бегунка слайдера и обработки указанных направлений
AbstractElement                     | Абстактный класс элементов уровня представления
IElement                            | Интерфейс элементов уровня представления
CurrentValue                        | Класс реализующий элемент текущего значения над бегунком слайдера
ICurrentValue                       | Интерфейс отображения текущего значения над бегунком слайдера
CurrentValueWrapper                 | Класс, реализующий взаимодействие текущего(их) значения(ий) слайдера с модулями верхнего уровня и, в случае двух значений, между собой
ICurrentValueWrapper                | Интерфей реализующий отображение и взаимодействие текущего(их) значения(ий) слайдера
ISetCurrentValuePositionOptions     | Интерфейс входных данных метода setCurrentValuePositionOptions интерфейса IcurrentValueWrapper
ScaleItem                           | Класс реализующий элемент значения на шкале слайдера
IScaleItem                          | Интерфейс элемента значения на шкале слайдера
ScaleWrapper                        | Класс реализующий шкалу слайдера
IScaleWrapper                       | Интерфейс шкалы слайдера
SliderHandle                        | Класс реализующий элемент бегунка слайдера
ISliderHandle                       | Интерфейс элемента бегунка слайдера
ISliderHandleOptions                | Интерфейс входных данных SliderHandle
SliderHandleWrapper                 | Класс реализующий отображение и взаимодействие элемента(ов) бегунок(ов) слайдера
ISliderHandleWrapper                | Интерфейс отображения и взаимодействие элемента(ов) бегунок(ов) слайдера
SliderLine                          | Класс реализующий элемент линии слайдера
ISliderLine                         | Интерфейс элемента линия слайдера
ISetRangeOptions                    | Интерфейс входных данных метода setRangeOptions интерфейса IsliderLine
SliderMainWrapper                   | Класс реализующий элемент обеспечивающий взаимодействие объектов с интерфейсами IsliderLine и IsliderHandleWrapper и модулем верхнего уровня (View)
ISliderMainWrapper                  | Интерфес элемента обеспечивающего взаимодействие объектов с интерфейсами IsliderLine и IsliderHandleWrapper
SliderRange                         | Класс реализующий элемент отображения диапазона выбранных значений слайдера
ISliderRange                        | Интерфейс отображения диапазона выбранных значений слайдера
LiteEvent                           | Класс реализующий создание и наблюдения за событиями в объектах
ILiteEvent                          | Интерфейс создание и наблюдения за событиями в объектах

## UML диаграмма доступна по [ссылке](https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1&title=sliderUML.drawio#R7V1bc9w2sv41qlIeRkUQvD7Gsr1W1oqdWJtszsvWWENLE4%2BGqpmRZefXH97AC9C4kARIOoFrKyuNCJBDNBp9%2BfrrM3z58PVfh%2FXj%2FXW6SXZnrrP5eoZfnrluGAQ4%2B7%2F8k2%2FlJxiHYfnJ3WG7KT9DzQcftn8l1YdO9enTdpMcOxee0nR32j52P7xN9%2Fvk9tT5bH04pM%2Fdyz6lu%2B5dH9d31R2d5oMPt%2Btdwlz2%2B3Zzui8%2FjfzW1W%2BS7d09uTNyqr98XN9%2BvjukT%2Fvqfmcu%2FlT8K%2F%2F8sCZzVdcf79eb9Ln1EX51hi8PaXoqf3r4epns8pdLXls57jXnr%2FVzH5L9SWXA6ePzf7%2Fefdj%2F%2Bur55jn5vy9%2F3r37uKpmOZ6%2BkfeRbLLXU%2F2aHk736V26X%2B9eNZ%2B%2BKL5zks%2FqZL8117xN08fsQ5R9%2BGdyOn2r1nr9dEqzj%2B5PD7vqr9kDH779Nx9%2F4ZNf%2F2j%2F7eXXavLyt2%2F1b5sf8xXPfv24S28%2Flx%2B93u521QWb9fG%2BeLB8Jvb9kC%2BbPh1uq297wm%2B%2FfkKhh%2F73%2B79%2F%2BvPV3b%2F%2F%2B78TeSmn9eEuOYmuqy7MX1nrDtXr%2F1eSPiTZ42cXHJLd%2BrT90pW4dSW4d%2FV1zeJlP1Tr12MtvWCWxfy6PZVrGfrVr3%2BQ9cp%2BbpYy%2F%2BVbe13LUVHQlYELB7tSOch%2Be58cttl7Sw7Q2rckJX1M9oygHE%2BH9HO936eRlki7tBRDs%2B%2B5%2Fta64DHd7k%2FH1szv8w%2ByCyqVvUJEIVUae0VU8WveiNEDPOmAIBCOyH4ov2ezO%2BoXprZhBCv3Zb17ql72%2B0NyzAQgEyp6Jx2ftw%2B79T7fMp%2FS%2FYlsqlx01rvtXSZiL2%2FLkfjFl%2BRw2mYnzI%2FVH075Vnpxe7%2Fdbd6uv6VPuZQcT9nxQX57cZ8etn9l067Jrsr%2BfDhVe84NOld8yEdWcpw9bnbNeyK1iProev21c%2BHb9fFUfXCb7nbrx%2BP2Y%2F01HjIB3u5fpKdT%2BlBdxN0U%2BTdMvgqlmCwtjilhQOSD5%2Ba4xUH12X3rqA3IScuV%2FYevv2YmwXp%2Fl32JnneMgRu6Qfd%2B6122nvv1KXmRK8kjo6A1iKDLiGBmRpxdumc%2FOg%2BFrYV%2FLH%2B7qkyv7BExKtemuu7LNnluLvst%2F619FSXH2bKdagV4me7SXH%2Fu01KwMwVJfURke5d8OnEl%2B%2Fi4vt3u794W17z0mk9%2Brd5t%2FlGajf20K1Ty%2FXazKZTyIT2tT%2BtSBPOnrXRX9qD%2Bi%2Bx%2F2RJd5iaCnz34ZfY7an7P%2Fpdffjhdpvvsu6y3hYAmmXw%2FJ7mMA6IrVAFyef7WlRGZ8GJPwykPPTEGJIZa4922WDv2kOu%2FwA%2FZUhV2QrWiN4VVsELMqmN21TGwwrv1x2T3Pj1uT9s0n%2F9QXkut%2FFyLGyhqpsjQ2nrA2maaOn8JT7en9HDe3tnFfs%2Bvznb863X%2B529dNUA%2BzPZOdS07uFAyzOjr9qfAqB8gPbTdb0%2FnszwMufRLmr1dzpPlz3CZPjxmUp8J2rl80HqzefWludblXnhMTpdPh1wUf8vXLb%2FR%2BW3rg%2FpO%2B6eHj5l9UAi4%2FP7UtMVbaM17hl%2F3nzjztrNZ02yO2xPZhOfpY7kXq2Fn4Qv2LSv%2F97He2t1n4y%2B78n8f1l%2FfrPeZNnpv7h7b4%2Bv08Fv7QP2Yprtkvdcx%2BWabv%2Ff2g3%2FYbTfJ4WX9ucLcYWuFyfdmheeuLTyvD%2BlDvdrSh1CZvpHN7oqA%2Bum2lDdwL4i0wYDXpaIMSnE%2FXt5nZmOyUVAEzZZpXumSvmh793Oev3ikXLSLuFe144%2BatvzDdl%2FoI%2BYLj9rquqcs53j3qXgD1%2BvD56NAzntsPva1V8OPxRqW%2B6MStiGbkJFKMn3%2BPS5329vPmRB%2FAUROYYrk9HPy%2FK4UBkYorspH%2BpCcTplNd5RPl8kZmesH3izQuHTfPufIvsy%2B3u5F4ehWM71%2B2kOvhtlV1uHRbBNHajaxj11DVjFi4zRXNlCjP1AT%2BVSYDwrU%2BFCgJuCvPD9Og%2BgwjesvNkyDQM9smYre6j%2BVnM24iA%2B0CzxBtHJUXocN8Cw6R9cjNwNn8bjKTJqKIYpImosJqyjaDJk70XO31EsZx7Vnm56zLfKoswZh4GyDDhsvFgT7BEmI2Fc43SA7aobTLQiB063yHh9rQ6s26Vu2F%2BtttiNfvx%2FWj4%2FtkZfAH4E5HjLtzowtD87r1p%2F4zn039Fh5JdD1yS55qC9%2Bc3P99lX2QS5nnGvzeCAToHxF%2FQEKmOSHOPuV2p%2FyRpW%2BOy%2FcV%2Fk%2F%2BCX5066bI3pRWif12J9%2BeUqKR9zlO777je%2BaY9TaD1JVPcp%2BgDQNMpYyIi6czRmZWF8EZY2gBTaVNQpivnPSTh59aelCPaE%2FvvocHy0XHzzj5xcfFWNCjeoHxZi7qBwOiiFNXjJPkvj6%2BJTZkq0DGQyKC37YHn%2FNveW3meZ5tc%2F3%2B6ZH1kVlZnY6wSxMzFJiahTfHjBozjk3%2F6G3GVTcoW0jdOKqEtuBSl%2FCIQY41agpelEkGz%2B0giOaclAvwIcelXJtItidKdWD%2FdnIazo9yQ6HvwU1SpZB1RBSOiT59t5mx%2FhfaygFTKtCVX1jI1GmLQ0gFg9ZGhjriEWBgROHsTWubKhCa6gC04EDKAwfQg6EK1h1Qagiiqg7YuCOCwlVhBD8rVHC9rixx409bsSae1TgAtI7sY64BVicNEt1Ur9kBS9P0mRG4DwJ96joJDmgt1JpwE6OA7quCupqLjdhazcCr5s3Dug5yietho07EkAp8ZYkJXm50c39li05Gr3gxhcyRF07AJPAkmQhe1cg8W6krdgHFBN%2FDjGp1QPqKIdGV8hLHTfb9UO63zBC1S6%2BWzkXjoPPWuV3F5EbnwlL8LJf6DytmowK6liWnHgFhWKeksne1YmUtiEylS16QMlVJJcsIEHPXXjpKUO2snHtxFR1xdQcpYwy2omdyQ%2B7MwWRa0bPeXQdZPXI3CejB3ihpG6yRuINHRDEmussQRkJZ1W9TneLuJp0L7tL61LojiJGrjehIiZn9gzF68M2SURJZBiLJZi%2BfoVlxcUeGj3Crc4ts9skWpIhW7nFspOpY4F4HcHHQdhb8FvulItxH4eq37kmNbpVkWSGtpFc7iMq2Kfr0Iqo09F3PMmGDOnthWWHkIOFI8xsLzZy2KlLtPFrM1A7z2GDyWA0GdESrY8YhVl5BQCYjSaKzH6sLBf8YKJSTkGbEPiAEFBr%2FE%2FEQGlZXN9VW1wdCCjBYS0DQPE2%2Bw9Q1qJAX%2FSFtAwELQnnVMmW9JyyD0JpyPyDsEkwFgdMLltlPG6%2FAohF%2BEgWZZRH7VgWcX5lrTET1phLJWecmF16POnSE98a0tZW6Vql%2B50o3VB5LwosYGjnGUun17GP7ym%2BxFWC0gjOZJkJNmKiFprRholi%2FduuvrKHqZ7D1KdCcH6ImC2NIDxmLDhLBcC87Aym49CA5YYQcMc5oHmQh12dM9vjm5ZY8FH5zfVSAD91qbCKABr127aQmEsIx1cPtEegMJnvKW8h%2FhkIbpjA2BnIRn2mLaZ3e6HEJiE1HpP%2BICKwEDyHi%2Bdd3rN%2BmebZlpccGTOs77CslE9h1Almgw%2FyoAb4sUdJl4EUkzsTxmwgXoErP8ZNZg%2FTlpSayQzMRPMs%2BNRMHFhQfzAPXZfhT5CzdGfCp9XHledEXZ0Wx5FEqYGJeCmOWoJ5U1N1YILeV1R17sKOsplBUxe%2BE2tZ%2BtkaMxA%2BBTmGI1rEIVeX9xFY9BQKJp75xFLVBk2bESdo9xlB2e8E%2BKwOM9KkW%2FBENRZU3IFBSmjC%2FgSoextPDFeln6p7uSF5nQUjNxwRStRpA9Bv9KkTDGp0M1xcXdWTcCIzkCblwl5oRK5XNJwTVTfiWpUMYtT3hQNwLLzeEKDt%2B9oLI%2BRWtcVS4E8juHTBtOdT4VZNguvSPge5kdG2SHVkvJVPqLrP2EyClkwCo%2FhIvLNdahsBcVEkIhnlZxICpiMSQEYIlfbO0RHJZaSvAXMV9LrtkH3BcdMkrt9uT9VHFcMdlf2uKO7YfEA5c5Uxk01aFbpbvjyFHEGPzSEoO4f2gjG6PBfimKBW%2BZ8IFdWzvBBbHrS8ptjyXDZbziX52CfPQB8KRXoP%2Fe0VLusGI79vT%2FcfTsljpyEQhxWczwai1rHB6jfNGwAgcYI2QOga2gGITdRb886keQd2vARRG8M6XjLuLXC%2FhVh3CILqExrCQvHQDKWVPoJJnF24e0w9uL89SIik9%2B86faL4M1pjUF1Z1ppnlDEI7RzflDGIIG50awxqWt5IUTGaMgYRxIwNVA5V1hsD3e7opuqvYDWRtSyVeoHl4T2Rp9%2BebbCvT92k7fQL5%2B9qettxzJxWACxkSCsgZMpExqyT2G1Day1lE5ayBxwHLrTwWuxkkrRZIJYaQ1hqyExWOpGshhJrqHq3jzJLIUHVUs0OPjLkR1mzVNPyAvXs4PKaMksx5HQAZml%2FVSAodW%2BZPnA4yGqNkWIFhb4hsdLSSRB8ZNbdubJ2jXm7BkVAoRi08kTxjLJrkL9cw8ZjsQVWDY1TQ5GycAqKsIwZLyBwyWEWdUpoc4HFo%2Fh4UY3N%2By6gzWQbzQXl6w1k6moo8jsPTkfzpmJPM%2BwJlMpZasf6sc0LEKbORUCTAcdRPESqG6i15xHodYVYrTmmp6Ay9VxFIfdi3UI%2Bysoiz90646gclrWy9FhZNA4TTLRCmc%2BaBrmfoaV0w8WYWhCMqYohbZJP66ddFaNXCtDzGuxatEgfY61WDdqbsHimEqAehJeykSZNyxsqKixTkSZPQNoBJEDbxFJMnhHqBn6f3H7unahU0EPFxNfbfXYKlQnVh%2B0eSKgSKq2H4jJuIpPXGLPJjHaSt%2FQXGddEl8t1Mr7HLTeHS5Kk42%2FBfe8jpoQWS7WXrbSFWluAikS33tUUy6H%2BtzJ%2B4mP2Eka%2BbN7%2BKV7yz8WU7z4VHWuv14fPx%2FM989GQrfk%2B25jbY95QDvgKJlEK%2FF6AMwM6rPGl%2BXQGgAggkJLuIKOPunyW5mZNBKBdal27%2B6DvPzIW1uacCNthDNQO1k1TJ%2Bupsh8R49x4%2FTfpMtE0TKAMQsMUgx6bbqZxuTamYSamgR22NhAmVx8U0qBrWXHE3m4xEY2Y76zYs%2FyfdZb3bp6u2oBCC5IczC%2FMQr%2Fbph6Mu9yDF3Fcn7QTZr2GGBfDz3JS6CxPIpjhDuibKfOjLpUElSozU%2FFPXhIvY2HhIWYP%2BTrh2VZOGoGvNBmiCxEX%2B8s45H0IIUJnH3hRSHtsio%2FNeqOPOjYnRboSSJTNP5hYXqhz05RIVx9KUmrIP%2FAgZfxiUmt6GxMyqN2QMdwrGEVjVca0pjcKO3gzdOG4g0zvkZ3DR5jRqlya%2BrE4g8xoL4TDGjzEGX39ipTi8wb4VGMleoAhQx1o9WEt9QktdeyzKQHQch6G5GaicSEQjVNpmzmFoS4oUpGdu%2FaEFZ6wWvpqqPhz%2BoJbc5%2Bwevpq9GcjRjQbsesKI1l6IbLEfJYey0SkFkJujudJaw7t0zED5ylSzUF6ZnKQvQ0uig16hSQYf2aA2zXRDIH85%2BnQUamLLpreFyuKRre14vTlyNAf6z1MJcaeqoLSn0ofp6BmbrzRXe8e%2Bmlat5Dw58jPH%2B1M%2BePCTmwhLEP3csNl9bLO1DBnaoVoLzsAGD%2FgxIeoHTHfn1K741LwDaRuF0p93K%2F3m11y6MJUix%2FON5m70g6M3lCoghrEGZJgs%2FW%2FxP6XjpLaabMkxJiyWRITyzt3liSAcqLVrk7355VuGKAaGih3%2BZMM3HTKFuYuOUDzdq%2FOTvqvj%2BkxOadnZmnV%2BOesVUsj5VY18SKqhhxnRs%2FSxExfdMeLScFzbog3xAEThXcCV7fVDPviK6rz08qnzS3D%2BGLyRdt5DWuQT2GQU1ksDyhorrvQjM9vrEKmow1erj0eCIojDR679hQUnYK1qhhlnEMibS45MneTxYFN62iOHDSo%2F%2Bfw4085Bu6baeCp0I9LsW9x72g600IAizvWMQMCdwLKHHLT2QS7b3EZJdE4codItK7gqap4T2UG1iTLfc3A3uJN7yPUbaYtH0A2nlnxnqliY6zeBjJGOT%2FIpLqbwLgXU0MZMxrSjGxHVK89t4rq8kSbvn7leRPkQb1ZyM5qx7rlVMvyoDxnvjJ3zXHsEWyF8S64NFTRybarE0Rx4PsodAl2dSJP3GV9HhnHk%2FW%2Bh3nfPnPcIsAXjgFPpf5wJH0ZeEOVvMUUfUAhhvMXhDLnTUsqGj%2B7ps5hI9eEl%2BW1Ai8IoVpRubZdL8xcz7LPkCLhgrBEZf5HQnKidnlNJqT0Uqqr3273yat97tVvlAf%2Bti02SLt2WnlsQfvS74YQY4zwfdhyDlZDiRX%2BKLApqKVIV2P99RyzoLg01T1TlKqBJzR%2FNFOqKhrlxPOZuxi6e1xVfYG4JRldu7uqtzdajxGyOKLSWHq5zVnjcrVtrSVNuQqfBoz6QC0G9iBFNBQ8hH3qlnWDzgUaTKTHAIcdpcpEvHvfKsvIlFRRNC3okfbr1b%2Fe3PQb8uLdzc27635j3r56rXyXbG%2Bti711vj2%2BPuQyxmFO7JqJ3YtU7lVOf76p9zIZQu3xH9gn%2BIfaHG2N5ikaIKEOtBW472Nj9seiYA29g%2BAXjkMxwSBUU8cPY4qP46hj1sQoXKBZM1WsMaQbGHi%2BmWAjpoKHOOhkfaTXkyIM3vWxM%2B76lVfl0M0GM2fKrw4D649FJw3fJrFqMUasHa0%2FSLpXiIlYBa4rFED5EDMiSPb3Mk6Efnkj0CoZLmU1esc4ag0hLprIQLQcXPZ5Od3ykzzqap%2FIHUSWOjzpCKZ0AnfK4z8IvzO9FtE6SlIryQ7wp4huEGOh5VG%2B2iUP2fpYngntSMyIjjWEUDMbqKh%2FYDOb7Kiki6N8DIR2VaByE4Q3YgEvnMjRh8jjuS0X%2FqFuOyvAYn0wylMHRdhU95rYBaSGWmVbFzV0eaGGttDymqqLihXZ48T64VKoFEBeuS7J87jpZTVXBZdOMZYl1Cmn5A3K87rnBzof3B7KTJgP4c73pgC8n5f7BRp32Y6b8r9pNaacTnK33w%2Frx8fkcM62JHEdwQ8lNr%2FzGNRduY1TFOa9SYEXyn4dZjTnFVTfkfsmrrMtPfA9HJvVEa3YoFm7D6%2F6zeQvpfV1ua%2Bkw9kulbcOSkFlyoFvu9BDXaHr3nrY6y6mpWSO95VErxf4hty3UQAtrk7Jw3mlXDndda7qC8VTkTd6JJcfoSkojv2r9lAL75joUAeyqiCXGLGttKdXCFmVDaaphza%2Bh6gbENegQdk4uIhb%2F8KwO3H5vsyF8%2BZh%2FRnQEGFA3kBX1YqjWraSCcpkIhnEFwQvjXDYbaGwqmveNWffsvvS4H0USSJ50iGG8hOzZKw7FSlUoBp7g2qvRgeqV%2B025lVxzKTJ6h4q3cz%2B6R%2BupkU29MVCzgxwvQmqEf2Z0sDjNDEfQxEFEoZArWJZS5tULqNlME6uYrp%2BIt%2FHQrmkR4TxBKVWwayUkwONiolpBMm6KOhE7W2aRkUg6ydv10uBfrZNlGlKlLHEsUCizIfwgMM6JGZ3pFBNJI28QFL2WotDIXGq1yHJK5xzPn%2FH9C4UXqfUGpHTa5EJMKl2W7yjpuQ1ALdBIqXgwajMHrjnjLVTJBtu8dZeywnyndrnyU9jdOEgPMQJGnHSKnvv0TL6Ia5iSt3HMqwMirBwhBmsTP1iW4rX2gGT2gE1mZlMJ2E6XqlMJkxJFnaAPopLsQQcQX%2BWM9dLdkmTpvrpl6ck%2F%2Fol0d6bm%2Bu3FdCrodxjUTTt41uU9BKPzPNaquMszmcac6DWZdrNgcgU0Ac5bCkms84W6TN4gWsTUbrCxhZY0P29DfbpmVxXAu%2F0T9gbQQEMxwBAynG%2FPZ0LPCw8s9NIzor75PZze4ar3Bo6lpWXfRc7VwCl9UMxR4xBA%2BVL3excjRPfpNxplQAf1g%2F%2F%2Bx%2B8CLFwDVAvu8g15YnPnVv0ww7bXV4VM6icdcbKPKiPDviul9XHDWhMQJ1K1t01VR%2FiIdb5dEHnU0R%2FMW75Xa0upj0chFtfXWgExNcq0Ql98gElI6xPpml5oa400PLq8MhEZ5FCqklkYmowLqn4VN5%2B5pjjuypXpafx%2FWjCls9sjdtCAFjWumHT5vum2i66ptweL9NDzmkjIeUb4HJQS5gfyewyysfVS8qOtYeHXu0C9Q6CtAvS0TzoryD95h7%2B%2Bunlxo9%2BeXW19d%2F8%2FLxy58Fz8XGCXkmirdKyNQq9tkviDM309eL80QsIi5VxiqSMeO5UIVvQHGAxZSAwJHJk%2BcWYMFZxhoxOMCYvb%2F717v7tp58%2Bef%2F54%2Bn9w9dfPn6pW63O5mUHcSd57RgXZ1CoBsqyKkNU1YhgetF1I4rskmAVuXLYhORHDAkkhE6rRr%2BPGOJLH4yGWA0ZQrqz8If4dOUKNcQQjQZrJ19ZHo3JYAHqPBpIYMmIYAEMkTt2POaWi%2BHREMACbFm7LWu3Ze22rJ3NPNuydngqzWXtNoghMs5rQ0o7%2F5BBXBICrD8xJsIag%2FqMQbq%2BvCbilbXERgMxok0nRtkdZqkOEXS05Ya9Wf0nZUTndNUpT88mo6LS0aaB7KhcDSFy1Me1ATfsKKucxTUkOrQzvBcdY0Uk8xA%2BkKBaEWOm6%2BLD2HhkTSd0pcZlzlG7OTROTNGperKQL0MqjSPNvOYiVBCnpMTaCebANQiiNnQA3eQPDBqxoVgEmCb1RXMHjQTYay21JNkk5Xk6cpJ1qfbGzPKlFe0CDIa6tARuPTO%2BaEXFDqsuzTZmcqjUuNrFbyo5kl5dbsYPyf6YNkGQ9f6bdVfV3VUtjW0gpYM8c2U0DrDTqXX%2BJ0K29CxwnSqXrbC5KhpBl7AuZe6I1lq8ahO1hlwayhaUJrP4sAXgwyrxyHFe5dzLXBXdSzKknEcZJTcUXacZkceOvb3Ps3PvDtts9LoYlVLlYmfhC%2FZtKP93YC2f%2Bn%2F7m7rjb9p4VZe79bF5VYV7V3yUHHXchxzNorvIJw%2BZYjFrJOq2IQCCXsiGwNg1FTabB4sGthqScOS1WyXRkMygDr1NwkA5JsYGYTFFON%2Bl1IctqjMf8gZhcGejxVPu11fLx%2ByRVQYKhXBISZEBisWQ9VH7itmfTw%2BPlUB5Y6Uup7CmVI0TDpG82YL66p0i4%2BUKHp5A8PCSBA8445CsG%2BnC5E75nNNeB60Lt00KCgTJJJodecAQ7E6hVscz12pVq0GnACFPnrp%2FA%2FGespvDJPKNXPGQ0cIKVovNksnnSVLlvEL1LIPsf2xGHOQM2a5DdeDQ2FBX%2BE07cLkOXNImvQ1VSqBIkVCCFJ73rZPAXlcx1GCfdsZ7KVA5LEiU1Gjfy9329nOyefWlHSS%2Bers9JeVHVWSwjohaogsVJFmtAxbJdAGePvP2Ac9MI79j%2BI%2FtAQ4zHuli%2ByerIDeD8GzhLLgifdZVRmcd107B9lUKVA5fSPVONobsl%2FGdbGRVpvQApLljCChms7S%2FM2i9kv1u3nqlLBpMeq%2FobvxF34i0oDBLMU7eY8sksabxJKZx3TqknXODWBZrgE9fOKgb0aIbs7bxQtCgyDVNLd4XM6lQfgdCIvcfKEu%2BHm5t%2BHE2fK2rRoEfoS0WGMM%2BupZC3OQCQzwMkzKIE0IpOfZRAUakVPE7nHZ7vSmjCkfRtQ0kSxCXaNMrWK02udADYB1I6EkKW7vPOjM5c0%2BfdQBBFGDqmW847FewhnYP7Aun9Y%2Bak9O4Gkr1%2Bd2ZUYyFLbG19TKmv9Ikru7MpGZd6cy51KchNfubyyx2son9ltAacsOZr4Q1M%2FGBMrsoTJtWhdo0jfWoXsQVommiXsTqeXL9AeLBefKA2lxT4EBIBs2ovJOowzIEfiITQiEnjxSFlLDkzy2jsSMUHvmAlR9LRrjjR3ihXmQTLNIz5%2Bt6irTxTE4d0ZMKsx8tQ5jpin0sYyVlSvwDNIXunCdlOKj5e51M9gO%2FLaDoAg2DkU6WUEZQ%2BxxYzpdCQYJJo%2B5KHP0QTSCN4wGdy8osIjPaSEHd%2BFSeRx8uDkYezKpHUFuLVMeVQJEMXO7J08N%2BFFy4sYdQGGSmtx8rrSgEeA3ZeSmPl%2BNL99cbjsvcS%2FJ0khGGctWIzaW0KDUpUbaJ6rZEj0lUk2Okg4SLgXjz8EQ1jbEAQJzQDWehOzRNW9Q3Tw2RztrEdP6g09EU6mDlASXcYGLakvKYXGAgMQ0usLnEtDIpj0JiGia2tpnof7oaAzLRoJTryESDHYwwSz682WZv%2FHR7zyx3ywmh1%2B5jZURB4QXQkVB%2FnXxDy7mIMOq2fWINLQLhG%2Bmn0FDAFTWDal7ODWNqHroRrNTFIRemnz4dEyOOLZqHgRd0bMNxjq228ggz%2BQL1hMBkQY15ovBDghpTFXpOt%2FZUoafvBBcu9utwCDYlCeLvzZR92niB0XiBR5g%2BDNV8ug4VOIXaIywlXOAKuiPYkk%2BzwEpXWZYXU%2FI5U5nW959DNnXKjW8EQNI66p0AsnOTkiQTebtFgXj%2Fzhje7izDEZA%2Bzb1oDPJI7mRWAOfF6Ta9uNtg3UCq8SxYFxbVi4iSoThzft1mbjXjX4PsxhOAHohTO6fsUqX7Dp4RaK4RfWsITdOHhkp%2Fhn0eRjd%2FCiSvOw%2F%2Bp0ajhX3gaGLx1hVsI2L03QAfXYemV4ukwuYEwhFdYVMYH3jGwkOg3OJ5VDgJFBJazTpY6IThoGghjIKEaidaaEy3A8Zsjgr44NCwFZj0iXRvlIgiA2o%2FosJVoespCV5%2FrU%2FfaYUralv%2BrqKHBDKsOwq8UDTCEBSLrGsntsq2pLYxVj0x1iIn3rUGSLlBuwg4AmJVdde5vlHWkL4lBrK9CKo7niPOSjBqUJz1vtMi9rJoGCINtrLdZ23UVSXqWmuGUSQdkCTriLpyntkFhIdaZ4uFGrzAJM8jW2BjWCiSeYSUQ3bUl1u920j6XNqPWrGx0TXdolqpq9ExOVGjZL2oejyvAGn1hul1rdrA6Q3V7ZodVzXzuSQf5gsHTvW2as8tvjX8o9XOmjcv1LQWtDMcgZ0xjiFzfEOEGerd2g6WnDp1oqI20ptcHobjOG4j%2FLFRMkAKo%2Bfz1rvQHsdHgyRB5moPcuynEIjI1S0PA51qpoAcddumKwwJHZlTHWHhCENONVmMdn2T9amn86lr3gCpJxIP9Kk9uuRzGS41DK1mnSLd0OqWlkSB19aT3QxXn4QWqKZUTCNlVRhwIpP6UduYAobQWFrVBC0tdoqY3L7KGXkueB%2FeYyEfe53r%2FUm07OKIZgsd%2F7aIL9Ssj81n3BGlx0XOBWpo949gOeAbKCzGrwnkBsSsIzbAEavPeu1hstBYyWBguWxNLjBSNT%2BMxckIP7geMluJWhvQ77yv3jNeokj0cXL6NdeeatWMNtz4PYYb6WpUflJJWJJq00rTqVOAJhmMXJLYhv7I5cxw%2Fosw6nhV8uiTmHFLBPInsbLCc%2BtCW0IsCZZpjWmpdxDSH%2BMcFtOKPLfjBq26%2Fa0VWg71HhDJqO1cB7nCIYbQhItquSkhtK3w47WcI1mt70D8leaYL8mGSjdIuBR4InZpeccShip2CCnEEEg8DdcaMCSKJEO8kEZaRlNsq5mLfS5iPP4gmgqqrro9lpYjc2cpqOmnO1sS4cRMwHdQ9c0UK02sz7k1IWIOcj%2BUcfUxQ1xPlv6KA184xIySIgmHJVA3mDrJjRfMKlu%2FS6k9QDGVa10hacFsxLDZ9B8SSYcg%2BqSeJD3hs0HWTtiM2iE2%2FdsWyzHpX0QKCdvxAqg74lCWSzo7BvVGXwptRSCAU%2FcNmdXRUfLDu8c89NXucdb9Ax06tKExoXHi62CfBCXd05BKArEFM7dK6IvO6%2BGMwKgt8KgdeML7nrLVOpO7jvzuySk1OGUjRh%2B1oBDOY25OR4ChR9zISaAgbnikuI1LXpJ9waDnrN1k1G5yAfatOvqmhR6cjuVhAnFYoOHkC%2Fi%2BZkEXbY%2BFaZVvglf73FDZqIw65GPo3HoxkTXHZOaYp7ynBOYYtIHMkYH7LPKYWWeL7Bm8wFCXamiBjQF7fAHmsTewp9INr0H1MAhyYx3Lv4kmgzpTQ4Kugw%2BcY4S6jKTTUmBtQWO2oOcC9QwQ5mZoAQVzQ38RBRQihwjWupVZJrTFOvQFbZCcgm58oHGAbYXNH3ZPweokoyzeW1WX1nppjFUIbiVjVmHEGoVXtYNiVagm9uyQLk50WefWhYKztZrrqUOZVBh0RxX%2BjQlUaKS3VsfqKJGOinpDbCG%2BbEhUjTG3RLYixeDyArwt4PKaclsjuBwldygqHfD49HG3va382AKC%2F%2B6wzV7DuigJ6FNakj%2BLivPbc87mXLrcrY%2BNZ1ockMVHyXHo3EQ6RTMLJrTOsNndAxCnwLtHA2%2BKkLKhtX1%2B%2FJi%2Fg9uTNeN0m3E0igk04xzIjBOtv8gVRq78jggvxI4TeMITZEWsahOqNh2uKSjbOvAj8COzuV5r92lb3hA4uaDlNWb3QTnUfqkEaxhaw3Cp2jMEmqaCloGjIUsCU%2Fswi%2FodEOrRDS%2FiSGvDC%2FPAvVAVuBfC4jMNjgoI%2BorQH9ZjGJw7o7t14JjRCzVxkw78OenQUDuopOy47TCohO8mcBhEeIXiOK9BTTfPaU1WkefIeIQV5JqblOljLjMmqDu%2B2ydKdwRScMIb23NWpBR1BKfB7WQM5D4T%2BUOPCjNNgHR%2F5HnFL0N0KQ0ZdifR1qmDvhMBrYhKJLsjvIrKzihifZ5WS8QGo%2ByvHs1BVbstyeXRhJRR5zCO%2Fe4kym3wmnAbEYqIeh59Aks3GY2lJLgR%2FGxGBXYWNg%2BewErb2c5XY6FMWVPCnSYv6UF0a%2FcVklHOMEMINF5dRKkRhgpuQzaWaB2eKRyeACgcAS20oUgX1uMhnEZtjwcKvczSwWjeyhHrfQgVb9gbC63qf2BTSRIU2qoOkwsMJPjBBTbX1khDVceYeg0bibG6UHGrsCkPOLRpKuMxT6%2F5AdRCw%2Bi0%2Bno6Op0XX7VAvIyYaPfgGUYs2lrU5XS7mGb7I8XxAhpChlNQyoXg0ExFA4ZEkraxiG6i03uAF3b8P1NkSA5zwsH9DayTpslJi%2BiFBpviQNX2gxvNRkzXEPaO9eRze2lE29k%2Bs3MXpzrKwi0os1ehjdBYhu0CwmMdMl0LDPWZhRbYXJk9DHN1FRszUGGbfKD5xgzATfX1qIAnV%2Bn6IBrZs%2BsDPNXVkW7ZQUJhVvka2JtQG1nQitDRRhZ0AeehwB4LevPanh26cNAgjuT5QG%2BecsdZfyr6MJgMjj2JJxUPd4B85G1p3a7njz1Pp3wYz3yqi4c3E5khXZ%2B9kjYFiOhcaf8RqEpUmfWuPTY%2FYJ1rk851GFOU0pg9FKHK%2B5o5eGwC1COQ8rZrDQVi53CtvaU15myIV%2BAuc%2FwxrdSGdIQKE4z2np3WvhUfNsa6c8bGsr2e5UIwucB1ue1s3Tk9xe6cS6huk2rOMfPm2pVhH2QVbHf0ZL1AgchJpaf7BFB409%2FeJ7efy9mvchvrWA7su%2BgqWfOBUzJp%2FaETSt%2BWYhWjgFrtu2uYarR37CK6sfLjclN2Y7XEdiZPUsXGrG7sGor2xLMEe6YvzfH6dYOaPrqCCVijSz0gAFRQA1aetJMpi13oPyR2JENoFAo1wEx5BZqpj0otx5WSW2RhD9A1VBEZBM3FROgcypHjVAlpaHZKbmVWlGaJf%2FPizqBcLUmUmOVXFyWPFSV8Ebf%2BheHfS7JmYZswIlnqR%2B4kMojU1Nl4QSF3MisnM9VLn8CmYE3irF%2Bt4AT9v1S71paUhTPYdDTmVYItZUeQWJugVJCW0N4jApmpiXwqW0ONMLQLZqrxnhISEKsKsBZigf4C7NFcjjIBRjHtxvQeEUsFOCJFFPAIQ%2BI4bwW3cxEO7a%2Bsj3NAayfxMtk6vUzTbKGrQN6UkR7iRVJFHo4f4sp2gus7oXCIoa0wC4BsLmSOukTrMXgHSDQdCVKQaHqILwvrNIHJ4UM0tw2HhXOmiGZjPAdBW1HnSMXvrK8uqcOeAIo2Dqk4z5FcIxVjH5%2BpQhV7eeH5SFoc9C%2BwAc88oh0ehqKvt2euHVxFpJuD9WNEyoL82tLQA%2BSHXcagqVy6dvEzxMvuDyR2xHUpNXGGCe3UAokdETZNc3K8337KVRU%2Fb9258FfVK%2F9QvvBG4UouXIC9tARtddEuZU9rCCE4Hhs4Hjj5sP6q0qquPwBye%2BwAVix5Da2vJMp%2FFHkNpLNqLgj9cDds2WuMrjBQZQ0usQY8I2zHsnjVl9vsxZ5u71kDF3QEKnsBuVyvxHFwJ3x04UbxEK%2BkN0JjtIsRi62M7KuFTtA99Vn66LpqfqSJ67lx51YuHkiR6YX%2BBanSrefCFz5CTfqzb2KVXJh%2B%2BnRMOtfos1kUiZba2E%2B2FzX7x6kwqen%2BOn06Ji%2FT5%2F15x8DqmFQVNi%2FpEBaUJthFPb64p%2FIdr7MD8b%2Fn%2FBnzv%2Fef8Q%2BtM%2F7nUeENZiL4c%2FKcnwDnj%2Bu7hDUvq5dXCmF5UgwAwebnWXWMwaNLnCN0iRCp2fkWxan1%2FX%2BNzHMrvgRrl3e%2BRHGOD%2FwOb7ZJcQyKvsSb6qgc%2BC2yx%2Fvev8Vlesh9iPctSPn5Pnm%2BTNPDZpt7k7xb5w93LM7wAd%2BsfO4P7PBhT32Tjn5m%2FtO2XnTfB27w5pmwzAg2v25cOlWA%2FOXTITeIJn7oN%2FVrVgWv9wW7dx14izVftB%2FrAMyDkJeDCZ%2B%2Ffj9nbpAunDqhQvO1y%2BRFYSeRM8RdUnCQ1KP2kaLPFHFcJsN5SIxprDiS1fszQ3wpIJ0O8fYfQTgGRC0txo6IZRlY5MeRaISZ5Kg7T78ztXKPmiSUkHnURKGZphIm14znywz1daHzI4Exwk6aWVAKEKAHrKjkPbTPNAzxpQwhiIEh9B8SSLE4dP%2BSIUOkQDZ6%2BXXj2MTHCI9JlNEQNgGqLwEKUYhCBX9DGz1gRN3SJQixRWZABXX8kFdhyUP1OxKRslj35PcwRx5K9obNhxlZYIg8dFp6DwGzsA3%2F6A%2F%2FuJLYj1WhmncYRAEK7jCBETAuEuMwq7qESMyZTp9NteB%2FttoaCoLtSf0YekQkA2CjmA599B4Ry54KReIRhgIZM5dInnWwFLM0ANW6CZA3Fecs5%2FYuc%2BRDMAFm0a1vOtA3ZRg46yipjBBTyEstBOdS6qs%2B8hZJwQkT2Hewlw3zmoCY6digVGXI1Xp6RYxpfT0HNWrtNrHKc5V3Dd%2F1BQVWBxQUPvZmqYk2UnlnoPqELmxvwm29G1hTNo3ByDz70FLmJzqhNWSIL43Nu3Q2b8CQQEp4gJg33X%2BI1EaVDDBjopJ0gAFULydrhrrt9RxMfp8na%2BZxWDfmQe6u3Aijzs1IrfSA9vaYkESR51bTDoagurD4sQbMhid%2BLeGij%2FmPleEJO%2B%2Bt9gsUvNyP6g96wcsrac6FwwkocZ5TmtUb0zucKvCWTEeaRJo5O9BgkY7ognBmKo5Ma5NXtixTu7w2lbtx1JEtt5Y1deHqFFdQzUcib1BxhU7t66oKbMBBCxmQV0TnyPFgeUWOL5nKtLyylRBG9SvV2DZ2wzH61SEzNlsgiObUr8hR5UKKJ5RXgi0ZIJ%2B1xT2VPLKwDt3yqLrck6wN49EwJIDKa4VpylpVPkFta8fiIIydfZ1Nj%2BNZ9zyHatmAtGBCoF07s9FQYaG94kiTqGS%2FHtL01L78sH68v043SX7F%2FwM%3D)

---

# Руководство по использованию

## Быстрый старт
1. Клонировать репозиторий
2. Запустить команду:
> npm run buildplugin
3. Скопировать папку с дистрибутивом (plugindist) в свой проект
4. Подключить библиотеку jQuery ([официальная страница](https://jquery.com/)) или из папки с дистрибутивом
5. Подключить файл плагина и стили
```html
...
<head>
    <script src="./plugindist/lib/jquery.js"></script>
    <script src="./plugindist/simpleslider.jquery.js"></script>
    <link rel="stylesheet" href="./plugindist/style.css">
</head>
...
```
6. Инициализировать плагин
```html
...
<body>
...
    <div class="slider"></div>
    <script>
        $(".slider").SimpleSlider();
    </script>
...
</body>
...
```

## Инициализация с параметрами
```html
...
<body>
...
    <div class="slider"></div>
    <script>
        $(".slider").SimpleSlider({
            isHorizontal: true,
            minVal: 0,
            maxVal: 100,
            currentVal: [0, 0],
            step: 1,
            isRange: false,
            isRangeLineEnabled: false,
            isVisibleCurrentValue: true,
            isScaleEnabled: false,
            numberOfScaleMarks: 2,
        });
    </script>
...
</body>
...
```

## Описание параметров

### isHorizontal
Ориентация слайдера
> isHorizontal: true //горизонтальная
> isHorizontal: false //вертикальная
По умолчанию:
> isHorizontal: true

### minVal
Минимальное значение
По умолчанию:
> minVal: 0
Может принимать численные положительные и отрицательные, целые и вещественные значения.
Не может быть больше **maxVal**

### maxVal
Максимальное значение
По умолчанию:
> maxVal: 100
Может принимать численные положительные и отрицательные, целые и вещественные значения.
Не может быть ментьше **minVal**.

### currentVal
Текущее значение
По умолчанию:
> currentVal: [0, 0]
Является массивом двух чисел. Первое число - значение "от", второе - "до", если **isRange: true**. Если  **isRange: false** - второе значение игнорируется. Может принимать  численные положительные и отрицательные, целые и вещественные значения в пределах от **minVal** до **maxVal**.

### step
Значение шага бегунка
По умолчанию:
> step: 1
Может принимать численные положительные целые и вещественные значения

### isRange
Одно значение / интервал
По умолчанию:
> isRange: false

### isRangeLineEnabled
Включение / отключение линии прогресса
По умолчанию:
> isRangeLineEnabled: false

### isVisibleCurrentValue
Включение / отключение отображения текущего значения над бегунком
По умолчанию:
> isVisibleCurrentValue: true

### isScaleEnabled
Включение / отключение шкалы значений
По умолчанию:
> isVisibleCurrentValue: false

### numberOfScaleMarks
Количество значений шкалы
По умолчанию:
> numberOfScaleMarks: 2
Может принимать численные положительные целые значения больше или равно 2

---

## API 

### Сохранение экземпляра объекта в переменную
```JavaScript
    $(".slider").SimpleSlider();
    let $slider = $(".slider").data("presenter");
```

### Получение текущих параметров слайдера
```JavaScript
    $(".slider").SimpleSlider();
    let $slider = $(".slider").data("presenter");
    let options = $slider.getOptions();
```

### Изменение текущих параметров слайдера
```JavaScript
    $(".slider").SimpleSlider({
        minVal: 0,
        maxVal: 100,
        currentVal: [0, 0],
    });
    let $slider = $(".slider").data("presenter");
    let options = $slider.setNewOptions({
        minVal: -100,
        maxVal: 150,
        currentVal: [10, 50],
        isRange: true
    });
```

### Callback функция для отслеживания изменения текущего значения
```JavaScript
    $(".slider").SimpleSlider();
    let $slider = $(".slider").data("presenter");
    let options = $slider.onCurrentValueChanged(function(currentValue){
        console.log(`Current value: [${currentValue[0]}, ${currentValue[1]}]`);
    });
```
---
