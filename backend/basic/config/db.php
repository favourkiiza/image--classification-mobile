<?php

return [
    'class' => 'yii\db\Connection',
    'dsn' => 'pgsql:host=127.0.0.1;dbname=image_classification',
    'emulatePrepare' =>true,
    'username' => 'postgres',
    'password' => 'postgres',
    'charset' => 'utf8',
    'schemaMap' => [
        'pgsql'=> [
            'class'=>'yii\db\pgsql\Schema',
            'defaultSchema' => 'public' //specify your schema here
        ]
    ], // PostgreSQL
    'enableSchemaCache' => false,
    'schemaCacheDuration' => 3600,
    // 'schemaCache' => 'cache',
];
