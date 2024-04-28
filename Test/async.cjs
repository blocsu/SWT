//Неделя 3. Асинхронность. Промисификация методов файловой системы (модуль fs) 06_видео

//const express = require('express');
//import express from 'express';

const prT = t => new Promise(res => setTimeout(res, t));
const prT1 = require('util').promisify(setTimeout);

(async () => {
    console.time('t0');
    console.time('t1');
    await prT(3000);
    console.log('Первый таймер завершен');
    console.timeEnd('t1');
    console.time('t2');
    await prT(4000);
    console.log('Второй таймер завершен');
    console.timeEnd('t2');
    console.time('t3');
    await prT1(5000);
    console.log('Третий таймер завершен');
    console.timeEnd('t3');

    console.timeEnd('t0');
    

}) ();