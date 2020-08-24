# business-exception-nestjs

## Description
Business exception with interceptor to help log and handle error messages on NestJs

## Instalation
```npm i --save business-exception-nestjs```

## Quick Start
<ol>
    <li>Import <b>BusinessExceptionModule</b> on your <b>AppModule</b> using <b>forRoot</b> or <b>forRootAsync</b> methods.</li>
    <li>Use <b>responseOnBusinessException</b> config property to transform response when throw <b>BusinessException</b> on your code.</li>
    <li>The <b>logOnBusinessException</b> config property is called when throw <b>BusinessException</b> on your code.</li>
    <li>The <b>logOnAnyException</b> config property is called when throw any exception on your code.</li>
</ol>