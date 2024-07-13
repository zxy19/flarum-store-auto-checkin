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

use Carbon\Carbon;
use Flarum\Extend;
use Flarum\User\User;
use Xypp\Store\Context\UseContext;
use Xypp\Store\PurchaseHistory;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),
    new Extend\Locales(__DIR__ . '/locale'),
    (new \Xypp\Store\Extend\StoreItemProvider())
        ->simple("auto-check-in", function (...$_) {
            return true;
        }, function (PurchaseHistory $item, User $user, string $data, UseContext $context) {
            $d = $item->data;
            if ($d != "default") {
                $a = Carbon::createFromTimestamp($d);
                if ($a->isSameDay(Carbon::now())) {
                    $context->noConsume();
                }
            }
            $item->data = Carbon::now()->getTimestamp();
            return true;
        })
];
