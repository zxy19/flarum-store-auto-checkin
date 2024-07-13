<?php

/*
 * This file is part of xypp/store-auto-checkin.
 *
 * Copyright (c) 2024 小鱼飘飘.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace Xypp\StoreAutoCheckin;

use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),
    new Extend\Locales(__DIR__ . '/locale'),
    (new \Xypp\Store\Extend\StoreItemProvider())
        ->simple("auto-check-in", function (...$_) {
            return true;
        })
];
